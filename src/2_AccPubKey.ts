import { AccPubKey } from '@terra-money/terra.js';

const accPubKey = async () => {
    const myWalletAddress = "terra1756rgnf42t73zjzdreg9xshvq7csq3pvsfkyl3"; // accAddress == walletAddress
    const myPubKey = AccPubKey.fromAccAddress(myWalletAddress); // validator address를 wallet address를 pubkey로 변환, `terrapub` + 39자 길이

    console.log(myPubKey);

    // pubkey 형식인지 확인
    console.log(AccPubKey.validate(myWalletAddress));
    console.log(AccPubKey.validate(myPubKey));
}

accPubKey();