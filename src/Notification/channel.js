import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

const PK = process.env.CHANNEL_PRIVATE_KEY;
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

const channelAddress = process.env.CHANNEL_ADDRESS;

const channel_optIn = async (address) => {
    await PushAPI.channels.subscribe({
        signer: _signer,
        channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
        userAddress: `eip155:5:${address}`, // user address in CAIP
        onSuccess: () => {
            console.log('opt in success');
        },
        onError: () => {
            console.error('opt in error');
        },
        env: 'staging'
    })
}

const channel_optOut = async (address) => {
    await PushAPI.channels.unsubscribe({
        signer: _signer,
        channelAddress: `eip155:5:${channelAddress}`, // channel address in CAIP
        userAddress: `eip155:5:${address}`, // user address in CAIP
        onSuccess: () => {
            console.log('opt out success');
        },
        onError: () => {
            console.error('opt out error');
        },
        env: 'staging'
    })
}

const Channel = () => {
    channel_optIn();
    channel_optOut()
}

export default Channel
