import { Box, Button, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js";
import GObject from "types/@girs/gobject-2.0/gobject-2.0";
import { type ButtonProps } from "./simple_button"; 


interface ToggleableButton extends ButtonProps {
    connection: [GObject.Object, () => boolean]
}

const SimpleToggleable = ({
    icon,
    label,
    class_name = '',
    toggle,
    toggleable = true,
    connection: [service, condition],
    ...rest
}: ToggleableButton) => Button({
    class_name: class_name + " toggleable",
    setup: self => self.hook(service, () => {
        self.toggleClassName("active", condition())
    }),
    on_clicked: toggle,
    sensitive: toggleable,
    child: Box({
        children: [
            Icon({
                class_name: "icon",
                icon
            }),

            Label({
                class_name: "label",
                label: label || ''
            }),
        ],
    }),
    ...rest
})

export { SimpleToggleable }
