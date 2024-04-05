import { Box, Button, CircularProgress, Icon, Label, Revealer } from 'resource:///com/github/Aylur/ags/widget.js';
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import options from 'ts/options';

const Volume = () => Box({
    class_name: 'volume',
    spacing: options.bar.spacing.bind(),
    css: 'min-width: 10px;',
    children: [
        Widget.Icon().hook(Audio, self => {
            if (!Audio.speaker)
                return;

            const category = {
                101: 'overamplified',
                67: 'high',
                34: 'medium',
                1: 'low',
                0: 'muted',
            };

            const icon = Audio.speaker.is_muted ? 0 : [101, 67, 34, 1, 0].find(
                threshold => threshold <= Audio.speaker.volume * 100);

            self.icon = `audio-volume-${category[icon!]}-symbolic`;
        }, 'speaker-changed'),

        Widget.Label().hook(Audio, self => {
            if (!Audio.speaker)
                return;

            self.label = `${Math.round(Audio.speaker.volume * 100)}%`;
        }, 'speaker-changed')
    ],
})

export default () => Button({
    class_name: 'volume-button',
    // css: 'background-color: transparent',
    on_scroll_up: () => Audio.speaker.volume >= 0.95 ? Audio.speaker.volume = 1 : Audio.speaker.volume += 0.05,
    on_scroll_down: () => Audio.speaker.volume <= 0.05 ? Audio.speaker.volume = 0 : Audio.speaker.volume -= 0.05,
    child: Volume(),
});
