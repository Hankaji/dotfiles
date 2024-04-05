import { Box, Button, Icon } from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options";

const GeneralSetting = () => Button({
    class_name: 'general-setting',
    child: Icon({ icon: 'menu/widget.svg'}),
    // on_clicked: ,
})

export default () => Box({
    hexpand: true,
    spacing: options.spacing,
    children: [
        GeneralSetting(),
    ]
})
