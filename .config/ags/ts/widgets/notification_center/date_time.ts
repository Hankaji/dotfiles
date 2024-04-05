import { Box, Label, Overlay, Icon } from "resource:///com/github/Aylur/ags/widget.js"
import icons from "ts/lib/icons"
import { uptime, dateTime } from "ts/lib/variables"
import options from "ts/options"

function leadingZero(n: number): string {
    return n < 10 ? "0" + n : n.toString()
}

function up(up: number) {
    const h = Math.floor(up / 60)
    const m = Math.floor(up % 60)
    return `${h}:${leadingZero(m)}`
}

const clockOpt = options.bar.clock

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default () => Box({
    class_name: "date-column vertical",
    spacing: options.bar.spacing.bind(),
    children: [
        Box({
            class_name: "calendar",
            children: [
                Widget.Calendar({
                    hexpand: true,
                    hpack: "center",
                }),
            ],
        }),
        Box ({
            class_name: "clock-box",
            vertical: true,
            spacing: options.bar.spacing.bind(),
            children: [
                Box({
                    class_name: "time-n-date",
                    spacing: options.bar.spacing.bind().as(s => s * 0.4),
                    vertical: true,
                    vexpand: true,
                    children: [
                        // Current time
                        Box({
                            class_name: "clock",
                            hexpand: true,
                            vexpand: false,
                            child: Overlay({
                                child: Box({
                                    hexpand: true,
                                    hpack: "end",
                                    vpack: "end",
                                    child: Label({
                                        class_name: "minute",
                                        hpack: "center",
                                        vpack: "center",
                                        label: dateTime.bind().as(dt => leadingZero(parseInt(dt.minute!))),
                                    })
                                }),
                                overlay: Box({
                                    hpack: "start",
                                    vpack: "start",
                                    child: Label({
                                        class_name: "hour",
                                        hpack: "center",
                                        vpack: "center",
                                        label: dateTime.bind().as(dt => leadingZero(parseInt(dt.hour!))),
                                    })
                                }),
                            })
                        }),
                        // Current day of the week
                        Label({
                            class_name: "weekday",
                            label: dateTime.bind().as(dt => `${weekdays[dt.weekday!]}, ${parseInt(dt.day!)}`),
                        }),
                        // Current Year and month
                        Box({
                            class_name: "year-month",
                            vertical: true,
                            vexpand: true,
                            vpack: "end",
                            children: [
                                Label({
                                    class_name: "year",
                                    label: dateTime.bind().as(dt => dt.year!.toString()),
                                }),
                                Label({
                                    class_name: "month",
                                    label: dateTime.bind().as(dt => months[parseInt(dt.month!)-1]),
                                }),
                            ]
                        })
                    ],
                }),
                // Uptime
                Label({
                    class_name: "uptime",
                    label: uptime.bind().as(up),
                }),
            ]
        })
    ],
})
