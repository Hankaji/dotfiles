import { SimpleToggleable } from "./utils/simple_toggle";
import icons from "ts/lib/icons";
import Notification from "resource:///com/github/Aylur/ags/service/notifications.js";
import { Box } from "resource:///com/github/Aylur/ags/widget.js";

const dnd = Notification.bind("dnd");

const DnD = () => SimpleToggleable({
    icon: dnd.as(dnd => icons.notifications[dnd ? "silent" : "noisy"]),
    // label: "Do not disturb",
    toggle: () => Notification.dnd = !Notification.dnd,
    toggleable: true,
    connection: [Notification, () => Notification.dnd],
});

export default () => Box({
    hexpand: true,
    class_name: 'toggleable-container',
    children: [
        DnD(),
    ]
})
