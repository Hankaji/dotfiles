import notifications from "resource:///com/github/Aylur/ags/service/notifications.js"
import options from "ts/options"
import icons from "ts/lib/icons"

const notifs = notifications.bind("notifications")

const ClearButton = () => Widget.Button({
    on_clicked: () => {
        const n = notifications.notifications
        const t = options.transition / 2
        for (let i = 0; i < n.length; i++)
            Utils.timeout(t * i, () => n[i]?.close())
    },
    sensitive: notifs.as(n => n.length > 0),
    child: Widget.Box({
        children: [
            Widget.Label("Clear "),
            Widget.Icon({
                icon: notifs.as(n => icons.trash[n.length > 0 ? "full" : "empty"]),
            }),
        ],
    }),
})

const Header = () => Widget.Box({
    class_name: "header",
    children: [
        Widget.Label({ 
            label: "Notifications", 
            hexpand: true, 
            xalign: 0 
        }),
        ClearButton(),
    ],
})


