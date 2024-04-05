import { exec } from "resource:///com/github/Aylur/ags/utils/exec.js";
import { Button, Icon } from "resource:///com/github/Aylur/ags/widget.js";
import options from "ts/options";

const { icon, size } = options.bar.menuButton;
export default () => Button({
    class_name: 'menu',
    child: Icon({
        icon: icon.bind(),
        size: size.bind(),
    }),
    on_primary_click: () => App.toggleWindow('menu'),
});
