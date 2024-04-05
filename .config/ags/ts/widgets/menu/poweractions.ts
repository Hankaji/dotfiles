import icons from "ts/lib/icons";
import options from "ts/options";
import { SimpleButton } from "./utils/simple_button";
import { exec } from "resource:///com/github/Aylur/ags/utils.js";
import { Box } from "resource:///com/github/Aylur/ags/widget.js";

const PowerOff = () => SimpleButton({
    icon: icons.powermenu.shutdown,
    toggle: () => exec("systemctl poweroff"),
    toggleable: true,
    class_name: "poweroff",
})

const Reboot = () => SimpleButton({
    icon: icons.powermenu.reboot,
    toggle: () => exec("systemctl reboot"),
    toggleable: true,
    class_name: "reboot",
})

const Suspend = () => SimpleButton({
    icon: icons.powermenu.sleep,
    toggle: () => exec("systemctl suspend"),
    toggleable: true,
    class_name: "suspend",
})

const Logout = () => SimpleButton({
    icon: icons.powermenu.logout,
    toggle: () => exec("hyprctl dispatch exit"),
    toggleable: true,
    class_name: "logout",
})

export default () => Box({
    // hexpand: true,
    // vexpand: false,
    vpack: 'center',
    // hpack: 'end',
    class_name: 'power-actions',
    spacing: options.theme.spacing.bind(),
    children: [
        Logout(),
        Suspend(),
        Reboot(),
        PowerOff(),
    ]
})

