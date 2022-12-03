import * as PushAPI from "@pushprotocol/restapi";

export const fetchUserNotification = async (address) => {
    await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, // user address in CAIP
        env: 'staging'
    });
}

