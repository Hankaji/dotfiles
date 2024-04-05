import PopupWindow from "ts/widgets/popup_window"
import { Window, Box, Label } from "resource:///com/github/Aylur/ags/widget.js"
import options from "ts/options"
import NotificationList from "./notifications"
import DateTime from "./date_time"

// export default (monitor: number) => Window({
//     name: `notification-center-${monitor}`,
//     class_name: "notification-center",
//     monitor,
//     popup: true,
//     visible: false,
//     anchor: ["top"],
//     child: Box({
//         class_name: "notification-center-wrapper",
//         spacing: options.bar.spacing.bind(),
//         children: [
//             NotificationList(),
//             DateTime(),
//         ],
//     }),
// })

export default () => PopupWindow({
    name: `notification-center`,
    class_name: "notification-center",
    transition: "slide_down",
    exclusivity: "exclusive",
    layout: "top",
    keymode: "none",
    child: Box({
        class_name: "notification-center-wrapper",
        spacing: options.bar.spacing.bind(),
        vexpand: false,
        children: [
            NotificationList(),
            DateTime(),
        ],
    }),
})
