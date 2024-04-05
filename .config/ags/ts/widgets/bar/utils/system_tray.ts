import { Box, Button } from 'resource:///com/github/Aylur/ags/widget.js';
import Systemtray from "resource:///com/github/Aylur/ags/service/systemtray.js";
import { type TrayItem } from 'resource:///com/github/Aylur/ags/service/systemtray.js';
import Gdk from "gi://Gdk"
import options from 'ts/options';

const { ignore } = options.bar.systray

const SysTrayItem = (item: TrayItem) => Button({
    class_name: "tray-item",
    child: Widget.Icon({ icon: item.bind("icon") }),
    tooltip_markup: item.bind("tooltip_markup"),
    setup: self => {
        const menu = item.menu
        if (!menu)
            return

        const id = item.menu?.connect("popped-up", () => {
            self.toggleClassName("active")
            menu.connect("notify::visible", () => {
                self.toggleClassName("active", menu.visible)
            })
            menu.disconnect(id!)
        })

        if (id)
            self.connect("destroy", () => item.menu?.disconnect(id))
    },

    on_primary_click: btn => item.menu?.popup_at_widget(
        btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),

    on_secondary_click: btn => item.menu?.popup_at_widget(
        btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),
})

export default () => Box({
        class_name: "system-tray",
        spacing: options.bar.spacing.bind(),
        visible: Systemtray.bind("items").as(i => i.filter(({ id }) => !ignore.value.includes(id)).length > 0),
    }).bind("children", Systemtray, "items", i => i
    .filter(({ id }) => !ignore.value.includes(id))
    .map(SysTrayItem))
