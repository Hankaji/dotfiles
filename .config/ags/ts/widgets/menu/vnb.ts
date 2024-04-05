import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Backlight from 'ts/services/backlight';
import { Box } from 'resource:///com/github/Aylur/ags/widget.js';
import SliderButton from './utils/slider';
import options from 'ts/options';

type Type = "microphone" | "speaker"

// const VolumeSlider = (type: Type = "speaker") => Widget.Slider({
//     hexpand: true,
//     draw_value: false,
//     on_change: ({ value, dragging }) => dragging && (Audio[type].volume = value),
//     value: Audio[type].bind("volume"),
// })

const VolumnSlider = (type: Type = "speaker") => SliderButton({
    icon: type === "speaker" ? "audio-volume-high" : "microphone",
    label: type === "speaker" ? "Speaker" : "Microphone",
    sliderColor: "white",
    on_change: ({ value, dragging }) => dragging && (Audio[type].volume = value),
    value: Audio[type].bind("volume"),
    sliderProps: {
        hexpand: true,
        draw_value: false,
    },
})

const BrightnessSlider = () => SliderButton({
    icon: "display-brightness",
    label: "Brightness",
    sliderColor: "white",
    on_change: ({ value }) => Backlight.screen_value = value,
    value: Backlight.bind("screen_value"),
    sliderProps: {
        hexpand: true,
        draw_value: false,
        min: 0.05,
    },
})

export default () => Box({
    class_name: 'vnb',
    hexpand: true,
    vertical: true,
    spacing: options.theme.spacing.bind(),
    children: [
        VolumnSlider("speaker"),
        BrightnessSlider(),
        // VolumnSlider("microphone"),
    ]
})
