import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js";
import { Label, Icon, Button, Box } from "resource:///com/github/Aylur/ags/widget.js";
import { type Props as LabelProps } from "types/widgets/label";
import options from "ts/options";
import icons from "ts/lib/icons";
import { icon } from "ts/lib/utils";

const players = Mpris.bind("players");
const media = options.media;

const Player = (player) => {

    const trackIcon = Icon({
        class_name: "track-icon",
        // Get the play and pause icons from gtk icons theme
        setup: self => {
            self.hook(player, () => {
                self.icon = player["play-back-status"] === "Playing" ? icons.mpris.playing : icons.mpris.stopped;
                // self.toggleClassName("playing", player["play-back-status"] === "Playing");
            }, 'notify::play-back-status');
        },
    });

    function TrackLabel(maxLength: number, label: LabelProps["label"]) {
        return Label({
            class_name: "label",
            max_width_chars: maxLength,
            truncate: "end",
            label,
            // setup: self => self.hook(player, () => {
            //     self.toggleClassName("playing", player["play-back-status"] === "Playing");
            // }, 'notify::play-back-status'),
        });
    }

    const artist = TrackLabel(25, player.bind("track_artists").transform(a => a.join(', ')) || 'Unknown Artist');

    const divider = Label({
        class_name: "divider",
        label: "-",
    });

    const title = TrackLabel(50, player.bind("track_title") || 'Unknown Title');

    const playericon = Icon({
        class_name: "icon",
        tooltip_text: player.identity || "",
        icon: Utils.merge([player.bind("entry"), media.monochromeIcon.bind()], (e, s) => {
            const name = `${e}${s ? "-symbolic" : ""}`
            print(name)
            return icon(name, icons.fallback.audio)
        }),
    })

    const content = Box({
        class_name: "info",
        spacing: options.bar.spacing.bind(),
        children: [
            trackIcon,
            artist,
            divider,
            title,
            playericon
        ],
        setup: self => self.hook(player, () => {
            self.toggleClassName("playing", player["play-back-status"] === "Playing");
        }, 'notify::play-back-status'),
    });

    return Button({
        class_name: "player-button",
        child: content,
        on_primary_click: () => player.playPause(),
    });
}

export default () => {
    return Box({
        class_name: "players",
        css: "padding: 1px;",
        visible: players.as(p => p.length > 0),
        child: players.as(p => p.length > 0 ? Player(p[0]) : Box()),
        setup: _self => {
            print(players)
            print("DEBUG: Setting up player widget");
        }
    });
}
