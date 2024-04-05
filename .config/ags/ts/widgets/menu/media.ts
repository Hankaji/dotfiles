import { type MprisPlayer } from "types/service/mpris"
import icons from "ts/lib/icons"
import type Gtk from "gi://Gtk?version=3.0"
import options from "ts/options"
import { icon } from "ts/lib/utils"
import { Box, Window, Label, Icon, Button, Slider, CenterBox } from "resource:///com/github/Aylur/ags/widget.js"

const mpris = await Service.import("mpris")
const players = mpris.bind("players")
const media = options.media

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

const Player = (player: MprisPlayer) => {
    const cover = Box({
        class_name: "cover",
        vpack: "start",
        css: Utils.merge([player.bind("cover_path"), media.coverSize.bind()], (path, size) => `
            min-width: ${size}px;
            min-height: ${size}px;
            background-image: url('${path}');
        `),
    })

    const title = Label({
        class_name: "title",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_title"),
    })

    const artist = Label({
        class_name: "artist",
        max_width_chars: 20,
        truncate: "end",
        hpack: "start",
        label: player.bind("track_artists").as(a => a.join(", ")),
    })

    const positionSlider = Slider({
        class_name: "position",
        draw_value: false,
        on_change: ({ value }) => player.position = value * player.length,
        setup: self => {
            const update = () => {
                const { length, position } = player
                self.visible = length > 0
                self.value = length > 0 ? position / length : 0
            }
            self.hook(player, update)
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const positionLabel = Label({
        class_name: "position",
        hpack: "start",
        setup: self => {
            const update = (_: unknown, time?: number) => {
                self.label = lengthStr(time || player.position)
                self.visible = player.length > 0
            }
            self.hook(player, update, "position")
            self.poll(1000, update)
        },
    })

    const lengthLabel = Label({
        class_name: "length",
        hpack: "end",
        visible: player.bind("length").as(l => l > 0),
        label: player.bind("length").as(lengthStr),
    })

    const playericon = Icon({
        class_name: "icon",
        hexpand: true,
        hpack: "end",
        vpack: "start",
        tooltip_text: player.identity || "",
        icon: Utils.merge([player.bind("entry"), media.monochromeIcon.bind()], (e, s) => {
            const name = `${e}${s ? "-symbolic" : ""}`
            print(name)
            return icon(name, icons.fallback.audio)
        }),
    })

    const playPause = Button({
        class_name: "play-pause",
        on_clicked: () => player.playPause(),
        visible: player.bind("can_play"),
        child: Icon({
            icon: player.bind("play_back_status").as(s => {
                switch (s) {
                    case "Playing": return icons.mpris.playing
                    case "Paused":
                    case "Stopped": return icons.mpris.stopped
                }
            }),
        }),
    })

    const prev = Button({
        on_clicked: () => player.previous(),
        visible: player.bind("can_go_prev"),
        child: Icon(icons.mpris.prev),
    })

    const next = Button({
        on_clicked: () => player.next(),
        visible: player.bind("can_go_next"),
        child: Icon(icons.mpris.next),
    })

    return Box(
        { class_name: "player", vexpand: false, css: "min-width: 500px;", },
        cover,
        Box<Gtk.Widget>(
            { vertical: true },
            Box([
                title,
                playericon,
            ]),
            artist,
            Box({ vexpand: true }),
            positionSlider,
            CenterBox({
                class_name: "footer horizontal",
                start_widget: positionLabel,
                center_widget: Box([
                    prev,
                    playPause,
                    next,
                ]),
                end_widget: lengthLabel,
            }),
        ),
    )
}

export default () => Box({
    vertical: true,
    class_name: "media vertical",
    spacing: options.theme.spacing.bind().as(v => v * 2),
    children: players.as(p => p.map(Player)),
})

// export const MediaWindow = () => Window({
//     name: "media",
//     css: "background-color: transparent;",
//     anchor: ["bottom", "left"],
//     child: Box({
//         class_name: "media",
//         children: players.as(p => p.map(Player)),
//     }),
// });
