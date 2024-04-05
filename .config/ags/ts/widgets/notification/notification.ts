import notifications, { type Notification } from "resource:///com/github/Aylur/ags/service/notifications.js"
import icons from "ts/lib/icons";
import { Box, Label } from "resource:///com/github/Aylur/ags/widget.js";
import GLib from "gi://GLib";
import options from "ts/options";
const popups = notifications.bind('popups');

const time = (time: number, format = "%H:%M") => GLib.DateTime
    .new_from_unix_local(time)
    .format(format)

const NotificationIcon = ({ app_entry, app_icon, image }: Notification) => {
    if (image) {
        return Widget.Box({
            vpack: "start",
            hexpand: false,
            class_name: "icon img",
            css: `
                background-image: url("${image}");
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                min-width: 64px;
                min-height: 64px;
            `,
        });
    }

    let icon = icons.fallback.notification;
    if (Utils.lookUpIcon(app_icon))
        icon = app_icon;

    if (app_entry && Utils.lookUpIcon(app_entry))
        icon = app_entry;

    return Widget.Box({
        vpack: "start",
        hexpand: false,
        class_name: "icon",
        css: `
            min-width: 64px;
            min-height: 64px;
        `,
        child: Widget.Icon({
            icon,
            size: 58,
            hpack: "center", hexpand: true,
            vpack: "center", vexpand: true,
        }),
    })
};

export default (n: Notification) => {
    const content = Widget.Box({
        class_name: "content",
        children: [
            NotificationIcon(n),
            Widget.Box({
                hexpand: true,
                vertical: true,
                children: [
                    Widget.Box({
                        children: [
                            Widget.Label({
                                class_name: "title",
                                xalign: 0,
                                justification: "left",
                                // hexpand: true,
                                max_width_chars: 24,
                                truncate: "end",
                                wrap: true,
                                label: n.summary.trim(),
                                use_markup: true,
                            }),

                            Widget.Label({
                                class_name: "time",
                                xalign: 1,
                                justification: "right",
                                hexpand: true,
                                // vpack: "start",
                                label: time(n.time),
                            }),

                            Widget.Button({
                                class_name: "close-button",
                                hpack: "end",
                                vpack: "center",
                                child: Widget.Icon("window-close-symbolic"),
                                on_clicked: n.close,
                            }),
                        ],
                    }),

                    Widget.Label({
                        class_name: "description",
                        hexpand: true,
                        use_markup: true,
                        xalign: 0,
                        justification: "left",
                        label: n.body.trim(),
                        max_width_chars: 24,
                        wrap: true,
                    }),
                ],
            }),
        ],
    });

    const actionsbox = n.actions.length > 0 ? Widget.Box({
        class_name: "actions horizontal",
        children: n.actions.map(action => Widget.Button({
            class_name: "action-button",
            on_clicked: () => n.invoke(action.id),
            hexpand: true,
            child: Label(action.label),
        })),
    }) : null

    const eventbox = Box({
        vexpand: false,
        child: Box({
            vertical: true,
            children: actionsbox ? [content, actionsbox] : [content],
        }),
    })

    return Box({
        class_name: `notification ${n.urgency}`,
        css: options.notification.width.bind().as(w => `min-width: ${w}px`),
        hexpand: true,
        child: eventbox,
    })
};
