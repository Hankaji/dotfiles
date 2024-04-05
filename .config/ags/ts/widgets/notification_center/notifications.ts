import { Box } from "resource:///com/github/Aylur/ags/widget.js"
import NotificationsService, { type Notification as Notif } from "resource:///com/github/Aylur/ags/service/notifications.js"
import Notification from "ts/widgets/notification/notification"
import options from "ts/options"
import icons from "ts/lib/icons"

const notifs = NotificationsService.bind("notifications")

const Animated = (n: Notif) => Widget.Revealer({
    transition_duration: options.transition.value,
    transition: "slide_down",
    child: Notification(n),
    setup: self => Utils.timeout(options.transition.value, () => {
        if (!self.is_destroyed)
            self.reveal_child = true
    }),
})

const ClearButton = () => Widget.Button({
    on_clicked: NotificationsService.clear,
    sensitive: notifs.as(n => n.length > 0),
    child: Widget.Icon({
        icon: notifs.as(n => icons.trash[n.length > 0 ? "full" : "empty"]),
    }),
    // child: Box({
    //     children: [
    //         Widget.Label("Clear "),
    //         Widget.Icon({
    //             icon: notifs.as(n => icons.trash[n.length > 0 ? "full" : "empty"]),
    //         }),
    //     ],
    // }),
})

const Header = () => Box({
    class_name: "header",
    children: [
        Widget.Label({ label: "Notifications", hexpand: true, xalign: 0 }),
        ClearButton(),
    ],
})

const NotificationList = () => {
    const map: Map<number, ReturnType<typeof Animated>> = new Map
    const box = Box({
        vertical: true,
        children: NotificationsService.notifications.map(n => {
            const w = Animated(n)
            map.set(n.id, w)
            return w
        }),
        visible: notifs.as(n => n.length > 0),
    })

    function remove(_: unknown, id: number) {
        const n = map.get(id)
        if (n) {
            n.reveal_child = false
            Utils.timeout(options.transition.value, () => {
                n.destroy()
                map.delete(id)
            })
        }
    }

    return box
        .hook(NotificationsService, remove, "closed")
        .hook(NotificationsService, (_, id: number) => {
            if (id !== undefined) {
                if (map.has(id))
                    remove(null, id)

                const n = NotificationsService.getNotification(id)!
                const w = Animated(n)
                map.set(id, w)
                box.children = [w, ...box.children]
            }
        }, "notified")
}

const Placeholder = () => Box({
    class_name: "placeholder",
    spacing: options.bar.spacing.bind(),
    vertical: true,
    vpack: "center",
    hpack: "center",
    vexpand: true,
    hexpand: true,
    visible: notifs.as(n => n.length === 0),
    children: [
        Widget.Icon(icons.notifications.silent),
        Widget.Label("Your inbox is empty"),
    ],
})

export default () => Box({
    class_name: "notifications",
    vertical: true,
    children: [
        Header(),
        Widget.Scrollable({
            vexpand: true,
            hscroll: "never",
            class_name: "notification-scrollable",
            child: Widget.Box({
                class_name: "notification-list vertical",
                css: options.notification.width.bind().as(w => `min-width: ${w*1.1}px`),
                vertical: true,
                children: [
                    NotificationList(),
                    Placeholder(),
                ],
            }),
        }),
    ],
})
