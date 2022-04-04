import { AccAddress, Account, AccPubKey, LCDClient, MnemonicKey } from '@terra-money/terra.js';
import { BaseAccount } from '@terra-money/terra.js';

import * as secret from '../.secret.json';

const terra = new LCDClient({
	URL: 'https://bombay-lcd.terra.dev',
	chainID: 'bombay-12'
});


// Type aliases:
//  Amino, Proto -> cosmos sdk 에서 사용하는 transaction format
// Functions:
//  fromAmino, fromData, fromProto
const account = async () => {
    const mnemonicKey = new MnemonicKey({
		mnemonic: secret.mnemonic
	})

    const wallet = terra.wallet(mnemonicKey);

    const base = new BaseAccount(wallet.key.accAddress, wallet.key.publicKey, await wallet.accountNumber(), await wallet.sequence());
    console.log(base.toAmino());
    console.log(base.toData());
    console.log(base.toProto());

    const amino = base.toAmino();
    const account1 = Account.fromAmino(amino);
    console.log(account1);

    const data = base.toData();
    const account2 = Account.fromData(data);
    console.log(account2);
}

account();


// amino 
//   {
//     type: 'core/Account',
//     value: {
//       address: 'terra1r5yedkngxyl39kqmsdfxlp7vm2e6h7cc3xhglr',
//       public_key: {
//         type: 'tendermint/PubKeySecp256k1',
//         value: 'Akw1A29IgKHFwXdwD7xyOP+Mm8bf7N4oxeNBfRvqHA4P'
//       },
//       account_number: '310414',
//       sequence: '30'
//     }
//   }

// data
//   {
//     '@type': '/cosmos.auth.v1beta1.BaseAccount',
//     address: 'terra1r5yedkngxyl39kqmsdfxlp7vm2e6h7cc3xhglr',
//     pub_key: {
//       '@type': '/cosmos.crypto.secp256k1.PubKey',
//       key: 'Akw1A29IgKHFwXdwD7xyOP+Mm8bf7N4oxeNBfRvqHA4P'
//     },
//     account_number: '310414',
//     sequence: '30'
//   }

// proto
//   {
//     address: 'terra1r5yedkngxyl39kqmsdfxlp7vm2e6h7cc3xhglr',
//     accountNumber: Long { low: 310414, high: 0, unsigned: false },
//     sequence: Long { low: 30, high: 0, unsigned: false },
//     pubKey: {
//       typeUrl: '/cosmos.crypto.secp256k1.PubKey',
//       value: <Buffer 0a 21 02 4c 35 03 6f 48 80 a1 c5 c1 77 70 0f bc 72 38 ff 8c 9b c6 df ec de 28 c5 e3 41 7d 1b ea 1c 0e 0f>
//     }
//   }

// acount1, acount2
//   BaseAccount {
//     address: 'terra1r5yedkngxyl39kqmsdfxlp7vm2e6h7cc3xhglr',
//     public_key: SimplePublicKey {
//       key: 'Akw1A29IgKHFwXdwD7xyOP+Mm8bf7N4oxeNBfRvqHA4P'
//     },
//     account_number: 310414,
//     sequence: 30
//   }