import { Box, Icon, Label } from "resource:///com/github/Aylur/ags/widget.js"
// import { time } from "../bar/utils/clock"
import Poweractions from "./poweractions"
import options from "ts/options"
import icons from "ts/lib/icons"
import { exec } from "resource:///com/github/Aylur/ags/utils.js"

const Greeting = () => {

    const user = USER[0].toUpperCase() + USER.slice(1)


    const avatar = Box({
        spacing: options.theme.spacing.bind(),
        vpack: 'center',
        // hpack: 'start',
        hexpand: true,
        children: [
            Box({
                vpack: "start",
                hexpand: false,
                class_name: "icon img",
                css: `
                    background-image: url("${options.menu.avatar.bind()}");
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-position: center;
                    min-width: 64px;
                    min-height: 64px;
                `,
            }),
            Label({
                class_name: 'ava-name',
                label: `Hello, ${user}`
            })
        ]
    })

    const powerOptions = Poweractions()

    return Box({
        hexpand: true,
        // css: 'min-height: 100px;',
        children: [
            avatar,
            powerOptions,
        ]
    })
}


// const ExtraInfo = () => {
//     const upTime = Variable('0', {
//         poll: [1000 * 60, ['uptime', '-p'], date => date]
//     })
//     return Box({
//         hexpand: true,
//         children: [
//             Label({
//                 hexpand: true,
//                 hpack: 'start',
//                 class_name: 'menu-time',
//                 label: time.bind(),
//             }),

//             Label({
//                 hpack: 'end',
//                 class_name: 'menu-uptime',
//                 label: upTime.bind(),
//             })
//         ]
//     })
// }

export default () => Box({
    class_name: 'greeting',
    hexpand: true,
    vertical: true,
    spacing: options.theme.spacing.bind(),
    children: [
        Greeting(),
        // ExtraInfo(),
    ]
})
