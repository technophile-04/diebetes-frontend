export const fetchUserNotification = (address) => {
    const notifications = await PushAPI.user.getFeeds({
        user: `eip155:5:${address}`, // user address in CAIP
        env: 'staging'
    });
}

