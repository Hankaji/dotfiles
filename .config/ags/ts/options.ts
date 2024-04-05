import { type BarWidgets } from "./widgets/bar/bar"
import { opt, mkOptions } from "ts/lib/options"

type Offset = {
    top: number,
    right: number,
    bottom: number,
    left: number,
}

const options = mkOptions(OPTIONS, {
    // General
    font: {
        size: opt(12),
        family: opt("JetBrains Mono, sans-serif"),
    },

    // Theme
    theme: {
        scheme: opt<"dark" | "light">("dark"),

        dark: {
            primary: {
                bg: opt("#1a1b26"),
                fg: opt("#a9b1d6"),
            },
            error: {
                bg: opt("#f7768e"),
                fg: opt("#24283b"),
            },
            hover: {
                bg: opt("#7aa2f7"),
                fg: opt("#24283b"),
            },
            active: {
                bg: opt("#bb9af7"),
                fg: opt("#b4f9f8"),
            },
            bg: opt("#414868"),
            fg: opt(" #c0caf5"),
            widget: opt("#eeeeee"),
            border: opt("#a9b1d6"),
        },
        light: {
            primary: {
                bg: opt("#426ede"),
                fg: opt("#eeeeee"),
            },
            error: {
                bg: opt("#b13558"),
                fg: opt("#eeeeee"),
            },
            hover: {
                bg: opt("#4d6aa7"),
                fg: opt("#eeeeee"),
            },
            active: {
                bg: opt("#6d5fb7"),
                fg: opt("#eeeeee"),
            },
            bg: opt("#fffffa"),
            fg: opt("#080808"),
            widget: opt("#080808"),
            border: opt("#080808"),
        },

        blur: opt(0),
        widget: { opacity: opt(94) },
        border: {
            width: opt(2),
            opacity: opt(96),
        },

        useShadows: opt(true),
        padding: opt(8),
        spacing: opt(12),
        radius: opt(12),
        iconSize: opt(24),

    },

    transition: opt(150),

    // Specific values

    bar: {
        position: opt<"top" | "bottom">("top"),
        height: opt<"auto" | number>("auto"),
        spacing: opt(12),

        layout: {
            start: opt<BarWidgets[]>([
                "menu",
                "workspaces",
                "player",
            ]),
            center: opt<BarWidgets[]>([
                "clock",
            ]),
            end: opt<BarWidgets[]>([
                "sysTray",
                "backlight",
                // "volume",
                "systemIndicator",
                "battery",
            ]),
        },


        menuButton: {
            icon: opt('/home/hankaji/Pictures/Icons/EndeavousOS-outline.svg'),
            size: opt(20),
        },
        workspaces: {
            count: opt(10),
        },
    
        clock: {
            interval: opt(1000),
            formatTime: opt("+%H:%M"),
            formatDate: opt("+%A, %b %d"),
            separatedLine: opt(false),
        },

        systemUpdates: {
            checkInterval: opt(60 * 60),
        },

        systray: {
            ignore: opt([
                "KDE Connect Indicator",
                // "spotify-client",
            ]),
        },
    },

    media: {
        monochromeIcon: opt(true),
        coverSize: opt(100),
    },

    menu: {
        avatar: opt("/home/hankaji/Pictures/Dont ask/Luxurious_Makeup_T_ava.png"),
        width: opt(500),
    },

    applauncher: {
        width: opt(400),
        margin: opt(80),
        maxItem: opt(6),
        // height: 500,
        iconSize: opt(48),
        favorites: opt([
            "Firefox Web Browser",
            "caprine",
            "discord",
            "YouTube Music",
            "spotify",
        ]),
    },

    notification: {
        position: opt<Array<"top" | "right" | "bottom" | "left">>(["top", "right"]),
        blacklist: opt(["dunst"]),
        width: opt(400),

        status: {
            position: opt<Array<"top" | "right" | "bottom" | "left">>(["bottom"]),
            offset: opt<Offset>({
                top: 0,
                right: 0,
                bottom: 200,
                left: 0,
            }),
            width: opt(300),
            lifeTime: opt(3000),
        },
    },

    // hardware: {
    //     cpu: {
    //         interval: 1000 * 2,
    //     },
    //     ram: {
    //         interval: 1000 * 2,
    //     },
    //     battery: {
    //         interval: 1000 * 60,
    //     },
    // },

    // powermenu: {
    //     sleep: "systemctl suspend",
    //     reboot: "systemctl reboot",
    //     logout: "pkill Hyprland",
    //     shutdown: "shutdown now",
    // },
})

// globalThis["options"] = options
export default options
