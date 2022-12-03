import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = process.env.CHANNEL_PRIVATE_KEY;
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

export const fetchUserNotification = async (address) => {
    const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, // user address in CAIP
        env: 'staging'
    });
}

