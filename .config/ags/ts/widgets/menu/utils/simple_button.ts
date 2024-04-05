import { Box, Button, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js";
import { type Props as IconProps } from "types/widgets/icon";
import { type Props as LabelProps } from "types/widgets/label";


interface ButtonProps {
    icon: IconProps["icon"],
    label?: LabelProps["label"],
    class_name?: string,
    toggle: () => void,
    toggleable: boolean,
}

const SimpleButton = ({
    icon,
    label,
    class_name = '',
    toggle,
    toggleable = true,
    ...rest
}: ButtonProps) => Button({
    class_name: class_name + " simple-button",
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

export { type ButtonProps }
export { SimpleButton }
