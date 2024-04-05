import { Box, Button, Icon } from 'resource:///com/github/Aylur/ags/widget.js';
import Backlight from 'ts/services/backlight'
import options from 'ts/options';
import icons from 'ts/lib/icons';

const BacklightLabel = () => Box({
    class_name: 'backlight',
    spacing: options.bar.spacing.bind(),
    css: 'min-width: 10px;',
    children: [
        Icon(icons.brightness.screen),

        Widget.Label({
            // label: Backlight.bind('screen_value').as(v => `${Math.round(v * 100)}%`),
            setup: self => self.hook(
                Backlight,
                (self, backlightValue) => {
                    // self.label = backlightValue ?? 0;

                    self.label = `${Math.round((Backlight.screen_value - 0.05) / 0.95 * 100)}%`; 
                },
                'screen-changed'
            )
        }),
    ],
})

export default () => Button({
    class_name: 'backlight-button',
    // css: 'background-color: transparent',
    on_scroll_up: () => Backlight.screen_value += 0.05,
    on_scroll_down: () => Backlight.screen_value <= 0.05 ? Backlight.screen_value = 0.05 : Backlight.screen_value -= 0.05,
    child: BacklightLabel(),
});
