import { Box, Window } from "resource:///com/github/Aylur/ags/widget.js"
import options from "ts/options"
import Greeting from "./greeting"
import Hardware from "./hardware";
import VnB from "./vnb";
import Toggleables from "./toggleable";
import Poweractions from "./poweractions";
import MediaPlayer from "./media";
import { Audio } from "resource:///com/github/Aylur/ags/service/audio.js";

const WINDOW_NAME = 'menu';

export default () => Window({
    name: WINDOW_NAME,
    popup: true,
    visible: false,
    // keymode: 'exclusive',
    anchor: ['top', 'right'],
    class_name: 'menu',
    child: Box({ // Wrapper for padding only
        class_name: 'menu-wrapper',
        vertical: true,
        spacing: options.theme.spacing.bind().as(v => v * 2),
        css: `min-width: ${options.menu.width.value}px;`,
        children: [
            Box({ // Real content lies here
                class_name: 'menu-content',
                hexpand: true,
                vertical: true,
                spacing: options.theme.spacing.bind(),
                children: [
                    Greeting(),
                    // Hardware(),
                    VnB(),
                    // Toggleables(),
                ],
            }),
            MediaPlayer(),
        ]
    }),
})
