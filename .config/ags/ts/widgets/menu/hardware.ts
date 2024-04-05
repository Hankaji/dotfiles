import { Box, CircularProgress, Icon, Label } from 'resource:///com/github/Aylur/ags/widget.js';
import Battery from "resource:///com/github/Aylur/ags/service/battery.js"
import options from 'ts/options';
import Variable from 'resource:///com/github/Aylur/ags/variable.js';
import SliderButton from './utils/slider'
import icons from 'ts/lib/icons';
import { exec } from 'resource:///com/github/Aylur/ags/utils/exec.js';

// top -bn2 | grep '%Cpu' | tail -1 | grep -P '(....|...) id,'| awk '{print 100-$8}'
const cpu = Variable('0', {
    poll: [options.hardware.cpu.interval,
        ['bash', '-c', 'top -bn2 | grep \'%Cpu\' | tail -1 | grep -P \'(....|...) id,\'| awk \'{print 100-$8}\''],
        cpu => cpu]
})

// const memTotal = exec('free -m | grep Mem | awk \'{printf "%.1f\n", ($2 / 1000)}\'')
const memTotal = '15.7'

const memUsed = Variable('0', {
    poll: [options.hardware.ram.interval,
        ['bash', '-c', 'free -m | grep Mem | awk \'{printf "%.1f\\n", ($3 / 1000)}\''],
        mem => mem]
})

const Hardware = () => {
    const battery = CircularProgress({
        class_name: 'menu-battery',
        visible: Battery.bind('available'),
        value: Battery.bind('percent').as(p => p / 100),
        child: Widget.Icon({
            class_name: 'icon',
            icon: Battery.bind('icon_name'),
        }),
        rounded: false,
        inverted: false,
        startAt: 0.75,
    })

    const batteryInfo = Box({
        class_name: 'battery-info',
        hpack: 'center',
        vpack: 'center',
        vertical: true,
        spacing: options.spacing,
        children: [
            battery,
            Label({
                class_name: 'battery-percent',
                label: Battery.bind('percent').as(p => p.toString() + '%'),
            }),
        ]
    })

    const cpuUsage = SliderButton({
        icon: icons.system.cpu,
        label: cpu.bind().as(p => `Cpu: ${p}%`),
        sliderColor: "white",
        on_change: () => {return}, // do nothing
        value: cpu.bind().as(p => parseFloat(p)),
        sliderProps: {
            hexpand: true,
            draw_value: false,
            sensitive: false,
            min: 0,
            max: 100,
        },
    })

    const memoryUsage = SliderButton({
        icon: icons.system.ram,
        label: memUsed.bind().as(p => `Memory: ${p}GB / ${memTotal}GB`),
        sliderColor: "white",
        on_change: () => {return}, // do nothing
        value: memUsed.bind().as(p => parseFloat(p) / parseFloat(memTotal)),
        sliderProps: {
            hexpand: true,
            draw_value: false,
            sensitive: false,
            min: 0,
            max: 1,
        },
    })

    return Box({
        hexpand: true,
        class_name: 'hardware',
        spacing: options.spacing,
        children: [
            // batteryInfo,
            Box({
                vertical: true,
                class_name: 'cpu memory widget-wrapper',
                spacing: options.spacing,
                vpack: 'center',
                children: [
                    cpuUsage,
                    memoryUsage,
                ]
            }),
        ]
    })
}

export default Hardware
