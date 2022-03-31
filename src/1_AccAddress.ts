import { AccAddress } from '@terra-money/terra.js';

// Functions:
//  fromValAddress, validate
const accAddress = async () => {
    const validatorAddress = "terravaloper15fl0fcnzreazj50x25rvyvr0rtn0nq2n742cxm"; // `Accomplice Blockchain` validator address
    const validatorWalletAddress = AccAddress.fromValAddress(validatorAddress); // validator address를 wallet address로 변환
    const myWalletAddress = "terra1756rgnf42t73zjzdreg9xshvq7csq3pvsfkyl3";

    console.log(validatorWalletAddress);

    // terra wallet address 형식인지 확인
    console.log(AccAddress.validate(validatorAddress));
    console.log(AccAddress.validate(validatorWalletAddress));
    console.log(AccAddress.validate(myWalletAddress));
}

accAddress();