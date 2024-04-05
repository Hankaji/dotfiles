import { Box, Button, Label } from 'resource:///com/github/Aylur/ags/widget.js';
import options from 'ts/options';
import { dateTime } from 'ts/lib/variables';

const clock = options.bar.clock;


const Time = () => Label({
    class_name: 'time',
    hpack: 'end',
    label: dateTime.bind().as(dt => dt.clock.time),
});

const Date = () => Label({
    class_name: 'date',
    hpack: 'end',
    label: dateTime.bind().as(dt => dt.clock.date),
});

export default () => Button({
    class_name: 'clock',
    on_clicked: () => App.toggleWindow('notification-center'),
    css: `margin: -${options.theme.spacing.value * 0.6}px`,
    child: Box({
        vertical: clock.separatedLine.bind(),
        vpack: 'center',
        hpack: 'end',
        children: [
            Date(),
            Time(),
        ],
    })
})