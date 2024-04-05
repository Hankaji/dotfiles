import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import { Box, Slider, Window, Icon, Overlay, Revealer } from "resource:///com/github/Aylur/ags/widget.js";
import { SliderProps } from "types/widgets/slider";
import { type Props as IconProps } from "types/widgets/icon";

import Gtk from "types/@girs/gtk-3.0/gtk-3.0";
import options from "ts/options";
import Debounce from "ts/lib/debounce";
import Backlight from "ts/services/backlight";

class Status {
    widget: Gtk.Widget;
    show: () => void;
    hide: () => void;

    constructor(widget: Gtk.Widget, show: (self: Status) => void, hide: () => void) {
        this.widget = widget;
        this.show = () => show(this);
        this.hide = hide;
    }

}

const StatusNotificationRevealer = (information: Gtk.Widget) => {

    const revealer = Revealer({
        class_name: "status-revealer",
        transition: "crossfade",
        transition_duration: 300,
        child: information,
    });

    const debounce = Debounce(options.notification.status.lifeTime.value, () => {
        revealer.reveal_child = false;
        App.closeWindow("status-notification-window");
    });

    return new Status(revealer, (self) => {
        // currentStatus?.hide();
        if (currentStatus != self) {
            currentStatus?.hide()
            currentStatus = self;
        } 
        App.openWindow("status-notification-window");
        revealer.reveal_child = true;
        debounce();
    }, () => {
        debounce.cancel();
        revealer.reveal_child = false;
    })
}

const SliderStatus = (icon: IconProps<unknown>["icon"], value?: SliderProps["value"]) => {

    const sliderIcon = Icon({
        class_name: "icon",
        hpack: "center",
        vpack: "center",
        icon,
    });

    const slider = Slider({
        class_name: "slider-status",
        hexpand: true,
        sensitive: false,
        draw_value: false,
        value,
        min: 0,
        max: 100,
    });

    const overlay = Overlay({
        child: slider,
        overlay: Box({
            class_name: "overlay",
            hexpand: true,
            hpack: "start",
            child: sliderIcon
        })
    });

    return Box({
        class_name: "status-wrapper",
        css: `min-width: ${options.notification.status.width}px;`,
        child: overlay,
    });
}

// Currently displayed status
let currentStatus: Status | null = null;
globalThis.currentStatus = currentStatus

// Status for volume
const volumeStatus = SliderStatus("audio-volume-high-symbolic", Audio["speaker"].bind("volume").as(v => v * 100));
const volumeRevealer = StatusNotificationRevealer(volumeStatus);
globalThis.volumeRevealer = volumeRevealer

// Status for brightness
const BrightnessStatus = SliderStatus("display-brightness-symbolic", Backlight.bind("screen_value").as(v => v * 100));
const brightnessRevealer = StatusNotificationRevealer(BrightnessStatus);
globalThis.brightnessRevealer = brightnessRevealer

const StatusHolder = Overlay({
    child: Box({
        child: brightnessRevealer.widget,
    }),
    overlays: [
        volumeRevealer.widget
    ],
});

const { top: offsetTop, right: offsetRight, bottom: offsetBottom, left: offsetLeft } = options.notification.status.offset.value;
export default () => Window({
    name: "status-notification-window",
    class_name: "status-notification",
    anchor: options.notification.status.position.bind(),
    popup: true,
    visible: false,
    margins: [offsetTop, offsetRight, offsetBottom, offsetLeft],
    child: Box({
        class_name: "popup-holder",
        child: StatusHolder,
    }),
})
