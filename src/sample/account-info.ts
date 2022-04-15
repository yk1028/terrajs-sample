import { LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { bech32 } from 'bech32';

import * as secret from '../../.secret.json';

const accountInfo = async () => {
    const terra = new LCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-12'
    });

    const mnemonicKey = new MnemonicKey({
        mnemonic: secret.mnemonic2
    })

    console.log(mnemonicKey.privateKey);

    console.log(mnemonicKey.privateKey.toString('hex'));

    console.log(mnemonicKey.publicKey);

    const wallet = terra.wallet(mnemonicKey);

    console.log(await terra.auth.accountInfo(wallet.key.accAddress))

    console.log(await wallet.accountNumber());
    console.log(await wallet.accountNumberAndSequence());
    console.log(wallet.key.accAddress);
    console.log(wallet.key.valAddress);
    console.log(wallet.key.publicKey.address());
    console.log(wallet.key.publicKey.pubkeyAddress());

    // IBC
    const terraAddress = wallet.key.accAddress;
    const decodedAddress = bech32.decode(terraAddress);
    console.log(decodedAddress)
    const osmosisAddress = bech32.encode('osmo', decodedAddress.words);

    console.log(osmosisAddress);
}

accountInfo();