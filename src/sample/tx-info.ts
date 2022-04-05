import { AuthInfo, Fee, LCDClient, MnemonicKey, ModeInfo, MsgSend, SignerInfo, SimplePublicKey, Tx, TxBody } from '@terra-money/terra.js';
import { CompactBitArray } from '@terra-money/terra.js/dist/core/CompactBitArray';

import * as secret from '../../.secret.json';

const txInfo = async () => {
    const terra = new LCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-12'
    });

    const mnemonic1Key = new MnemonicKey({
        mnemonic: secret.mnemonic1
    })

    const mnemonic2Key = new MnemonicKey({
        mnemonic: secret.mnemonic2
    })

    const wallet1 = terra.wallet(mnemonic1Key);
    const wallet2 = terra.wallet(mnemonic2Key);

    const send = new MsgSend(
        wallet1.key.accAddress,
        wallet2.key.accAddress,
        "1uluna"
    );

    try {
        const tx = await wallet1.createAndSignTx({
            msgs: [send],
            memo: 'send test',
        })

        console.log(tx);
        console.log(tx.body.messages);
        console.log(tx.auth_info.signer_infos);
        console.log(tx.auth_info.fee.amount);

    } catch (err) {
        console.log("+++ error: ", err);
    }

    // tx body
    const messages = [new MsgSend("from", "to", "{uluna: 1}")];
    const memo = "memo";
    const timeout_height = 1;

    // auth info
    const gasLimit = 1;
    const pubKey = "";
    const fee = new Fee(gasLimit, "uluna 1");

    // signatures
    const signatures = [];

    const tx = new Tx(
        new TxBody(messages, memo, timeout_height),
        new AuthInfo(
            [
                new SignerInfo(
                    new SimplePublicKey(pubKey),
                    1,
                    new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)) // single vs multi
                    
                )
            ],
            fee
        ),
        signatures
    );

    const multiSigTx = new Tx(
        new TxBody(messages, memo, timeout_height),
        new AuthInfo(
            [
                new SignerInfo(
                    new SimplePublicKey(pubKey),
                    1,
                    new ModeInfo(new ModeInfo.Multi(CompactBitArray.fromBits(1), [])) // single vs multi
                    
                )
            ],
            fee
        ),
        signatures
    );
   

}

txInfo();
