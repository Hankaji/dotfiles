import { Box, Button, Icon, Label, Menu, MenuItem, Switch } from 'resource:///com/github/Aylur/ags/widget.js';
import { type Switch as SwitchType } from 'types/widgets/etc';
import Battery from "resource:///com/github/Aylur/ags/service/battery.js"
import Gdk from "gi://Gdk"
import Gtk from 'gi://Gtk?version=3.0';
import options from 'ts/options';


export default () => {

    // const batterySavingModeSwitch = Switch({
    //     setup: self => self.connect('state-set', (self: SwitchType<unknown>, state) => {
    //         self.toggleClassName('checked', state)
    //         print(state)
    //     })
    // })

    // const batteryMenu = Menu({
    //     children: [
    //         MenuItem({
    //             class_name: 'no-hover',
    //             on_activate: () => batterySavingModeSwitch.set_active(!batterySavingModeSwitch.active),
    //             child: Box({
    //                 spacing: options.bar.spacing.bind(),
    //                 children: [
    //                     Label({ label: 'Battery saving mode' }),
    //                     batterySavingModeSwitch
    //                 ]
    //             })
    //         }),
    //     ],
    // })

    return Box({
        class_name: 'battery',
        visible: Battery.bind('available'),
        spacing: options.bar.spacing.bind(),
        children: [
            Icon({
                icon: Battery.bind('percent').transform(p => {
                    return `battery-level-${Math.floor(p / 10) * 10}-symbolic`;
                }),
            }),
            Label().hook(Battery, self => {
                self.label = `${Battery.percent}%`;
            }, 'notify::percent'),
        ],
    })
}
