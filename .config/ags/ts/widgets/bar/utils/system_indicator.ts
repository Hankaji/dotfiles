import { bluetooth } from "resource:///com/github/Aylur/ags/service/bluetooth.js"
import network from "resource:///com/github/Aylur/ags/service/network.js"
import notifications from "resource:///com/github/Aylur/ags/service/notifications.js"
import icons from "ts/lib/icons"

const DNDIndicator = () => Widget.Icon({
    visible: notifications.bind("dnd"),
    icon: icons.notifications.silent,
})

const BluetoothIndicator = () => Widget.Overlay({
    class_name: "bluetooth",
    passThrough: true,
    child: Widget.Icon({
        icon: icons.bluetooth.enabled,
        visible: bluetooth.bind("enabled"),
    }),
    overlay: Widget.Label({
        hpack: "end",
        vpack: "start",
        label: bluetooth.bind("connected_devices").as(c => `${c.length}`),
        visible: bluetooth.bind("connected_devices").as(c => c.length > 0),
    }),
})

const NetworkIndicator = () => Widget.Icon().hook(network, self => {
    const icon = network[network.primary || "wifi"]?.icon_name
    self.icon = icon || ""
    self.visible = !!icon
})


