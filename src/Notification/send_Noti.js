import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import { useSmartAccountContext } from "../contexts/SmartAccountContext";

const PK = process.env.CHANNEL_PRIVATE_KEY;
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const { address } = useSmartAccountContext();
const channelAddress = process.env.CHANNEL_ADDRESS;

export const sendNotification = async (title, description, msg) => {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 3, // target
            identityType: 2, // direct payload
            notification: {
                title: { title },
                des: { description }
            },
            payload: {
                title: { title },
                body: { msg },
                cta: '',
                img: ''
            },
            recipients: `eip155:5:${address}`, // recipient address
            channel: `eip155:5:${channelAddress}`, // your channel address
            env: 'staging'
        });

        // apiResponse?.status === 204, if sent successfully!
        console.log('API repsonse: ', apiResponse);
    } catch (err) {
        console.error('Error: ', err);
    }
}
