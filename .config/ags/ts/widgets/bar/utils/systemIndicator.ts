import { Button, Icon, Overlay } from "resource:///com/github/Aylur/ags/widget.js"
import Audio from "resource:///com/github/Aylur/ags/service/audio.js"
import Bluetooth from "resource:///com/github/Aylur/ags/service/bluetooth.js"
import Notifications from "resource:///com/github/Aylur/ags/service/notifications.js"
import Network from "resource:///com/github/Aylur/ags/service/network.js"
import icons from "ts/lib/icons"
import options from "ts/options"
import { systemUpdates, uptime } from "ts/lib/variables"
import { exec } from "resource:///com/github/Aylur/ags/utils/exec.js"

const PacmanUpdates = () => Icon({
    class_name: "pacman-updates",
    icon: icons.system.pacman,
    tooltip_text: systemUpdates.bind().as(u => u > 0 ? `${u} updates available` : "All packages are up to date"),
    // tooltip_text: Audio.speaker.bind("volume").as(v => "$"),
})
// .hook(systemUpdates, self => {
//     const cons = [[25, "few-packages"], [50, "decent-packages"], [75, "many-packages"]] as const
//     self.toggleClassName(cons.find(([n]) => n <= systemUpdates.value)?.[1] || "")
// })

const MicrophoneIndicator = () => Icon()
    .hook(Audio, self => self.visible =
        Audio.recorders.length > 0
        || Audio.microphone.stream?.is_muted
        || Audio.microphone.is_muted)
    .hook(Audio.microphone, self => {
        const vol = Audio.microphone.stream!.is_muted ? 0 : Audio.microphone.volume
        const { muted, low, medium, high } = icons.audio.mic
        const cons = [[67, high], [34, medium], [1, low], [0, muted]] as const
        self.icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
    })

const DNDIndicator = () => Icon({
    visible: Notifications.bind("dnd"),
    icon: icons.notifications.silent,
})

const BluetoothIndicator = () => Overlay({
    class_name: "bluetooth",
    passThrough: true,
    child: Icon({
        class_name: "icon",
        icon: icons.bluetooth.enabled,
        visible: Bluetooth.bind("enabled"),
    }),
    overlay: Widget.Label({
        hpack: "end",
        vpack: "start",
        label: Bluetooth.bind("connected_devices").as(c => `${c.length}`),
        visible: Bluetooth.bind("connected_devices").as(c => c.length > 0),
    }),
})

const NetworkIndicator = () => Icon().hook(Network, self => {
    const icon = Network[Network.primary || "wifi"]?.icon_name
    self.icon = icon || ""
    self.visible = !!icon
})

const AudioIndicator = () => Icon({
    icon: Audio.speaker.bind("volume").as(vol => {
        const { muted, low, medium, high, overamplified } = icons.audio.volume
        const cons = [[101, overamplified], [67, high], [34, medium], [1, low], [0, muted]] as const
        const icon = cons.find(([n]) => n <= vol * 100)?.[1] || ""
        return exec(`pamixer --get-mute`) === "true" ? muted : icon
    }),
    // tooltip_text: Audio.speaker.bind("volume").as(v => (Math.round(v * 100)).toString().concat("%"))
})

export default () => Button({
    class_name: "quicksettings panel-button",
    on_clicked: () => App.toggleWindow("menu"),
    on_scroll_up: () => Audio.speaker.volume += 0.02,
    on_scroll_down: () => Audio.speaker.volume -= 0.02,
    child: Widget.Box({ 
        spacing: options.theme.spacing.bind(),
        children: [
            PacmanUpdates(),
            DNDIndicator(),
            BluetoothIndicator(),
            NetworkIndicator(),
            AudioIndicator(),
            MicrophoneIndicator(),
        ]
    }),
})
