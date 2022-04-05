import { Coin, Coins } from '@terra-money/terra.js';

const coinInfo = async () => {
    const c = new Coin('uluna', 1500000); // 1.5 LUNA
    const c2 = new Coin('uluna', 3000000); // 3 LUNA
    const c3 = new Coin('uluna', 4000000); // 4 LUNA
    c.add(c2); // 4.5 LUNA

    const cs = new Coins([c, c2, c3]); // c + c2 + c3
    console.log(cs);
    const cs2 = new Coins({ uluna: 12002, ukrw: 12399 });
    cs2.map(x => console.log(`${x.denom}: ${x.amount}`));
}

coinInfo();