import { Button } from "@chakra-ui/button";
import pushNotification from "../utils/pushNotification";
export default function SendNotificationButton(params) {
    
    function onClickHandler() {
        console.log(params.signer)
        pushNotification(params.signer.getSigner())
    }

    return <Button onClick={onClickHandler}>Send Notifications</Button>
}