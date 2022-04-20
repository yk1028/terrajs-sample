import {
    LCDClient,
    MnemonicKey,
    SignDoc,
    LegacyAminoMultisigPublicKey,
    SimplePublicKey,
    MsgSend,
    MultiSignature,
    SignatureV2
} from '@terra-money/terra.js';

import * as secret from '../../.secret.json';

const terra = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.38 },
});

const multisig = async () => {
    // create a key out of a mnemonic
    const mk1 = new MnemonicKey({
        mnemonic: secret.mnemonic1
    });

    const mk2 = new MnemonicKey({
        mnemonic: secret.mnemonic2
    });

    const mk3 = new MnemonicKey({
        mnemonic: secret.mnemonic3
    });

    const multisigPubkey = new LegacyAminoMultisigPublicKey(2, [
        mk1.publicKey as SimplePublicKey,
        mk2.publicKey as SimplePublicKey,
        mk3.publicKey as SimplePublicKey,
    ]);

    
    const address = multisigPubkey.address();
    const multisig = new MultiSignature(multisigPubkey);

    // create a simple message that moves coin balances
    const send = new MsgSend(
        address,
        'terra1756rgnf42t73zjzdreg9xshvq7csq3pvsfkyl3',
        { uusd: 100 }
    );

    const accInfo = await terra.auth.accountInfo(address);
    const tx = await terra.tx.create(
        [
            {
                address,
                sequenceNumber: accInfo.getSequenceNumber(),
                publicKey: accInfo.getPublicKey(),
            },
        ],
        {
            msgs: [send],
            memo: 'memo'
        }
    );

    const sig1 = await mk1.createSignatureAmino(
        new SignDoc(
            terra.config.chainID,
            accInfo.getAccountNumber(),
            accInfo.getSequenceNumber(),
            tx.auth_info,
            tx.body
        )
    );

    const sig2 = await mk2.createSignatureAmino(
        new SignDoc(
            terra.config.chainID,
            accInfo.getAccountNumber(),
            accInfo.getSequenceNumber(),
            tx.auth_info,
            tx.body
        )
    );

    multisig.appendSignatureV2s([sig1, sig2]);
    tx.appendSignatures([
        new SignatureV2(
            multisigPubkey,
            multisig.toSignatureDescriptor(),
            accInfo.getSequenceNumber()
        ),
    ]);
    console.log(JSON.stringify(tx.toData()));
    terra.tx.broadcast(tx).then(console.log);
}

multisig();