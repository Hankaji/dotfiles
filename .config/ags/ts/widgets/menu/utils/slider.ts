import { Box, Icon, Label, Slider } from "resource:///com/github/Aylur/ags/widget.js"
import { SliderProps } from "types/widgets/slider"
import options from "ts/options"
import { BoxProps } from "types/widgets/box"
import { type Props as LabelProps } from "types/widgets/label"

interface SliderButtonProps {
    icon: string,
    label: LabelProps['label'],
    sliderColor: string,
    on_change: ({value, dragging}) => void,
    value,
    sliderProps: SliderProps,
    // rest: BoxProps,
}

export default ({ icon, label, sliderColor, on_change, value, sliderProps, ...rest } : SliderButtonProps) => {

    const widgetIcon = Icon({
        class_name: `icon`,
        icon
    })

    const widgetLabel = Label({
        class_name: 'label',
        label,
        hpack: 'start',
    })

    const sliderButton = Slider({
        class_name: 'slider-button',
        css: `color: ${sliderColor}`,
        on_change: ({value, dragging}) => on_change({value, dragging}),
        value,
        ...sliderProps,
    })

    return Box({
        class_name: 'slider-box',
        // css: `min-width: 200px;`,
        hexpand: true,
        // hpack: 'start',
        vpack: 'center',
        children: [
            widgetIcon,

            Box({
                class_name: 'slider-label',
                hexpand: true,
                spacing: options.theme.spacing.bind(),
                vertical: true,
                children: [
                    widgetLabel,
                    sliderButton,
                ]
            }),
        ],
        ...rest,
    })
}