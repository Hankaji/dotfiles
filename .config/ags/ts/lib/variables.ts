import GLib from "gi://GLib"
import { exec } from "resource:///com/github/Aylur/ags/utils/exec.js";
import options from "ts/options"
//
// const intval = options.system.fetchInterval.value
// const tempPath = options.system.temperature.value

const clock = options.bar.clock;
const { formatTime, formatDate, interval } = clock;

// export const clock = Variable(GLib.DateTime.new_now_local(), {
//     poll: [1000, () => GLib.DateTime.new_now_local()],
// })

type DateType = {
    clock: {
        date: string,
        time: string
    },
    year?: string,
    month?: string,
    day?: string,
    weekday?: string,
    hour?: string,
    minute?: string,
    second?: string,
}

// const d = new Date()
// const date = Variable<DateType | null>(null, {
//     poll: [interval.value, () => {
//         return {
//             year: d.getFullYear(),
//             month: d.getMonth(),
//             day: d.getDate(),
//             weekday: d.getDay(),
//             hour: d.getHours(),
//             minute: d.getMinutes(),
//         } as DateType
//     }],
// })

const defaultDateTime: DateType = {
    clock: {
        date: '',
        time: ''
    },
    year: '',
    month: '',
    day: '',
    weekday: '',
    hour: '',
    minute: '',
    second: '',
}

const dateTime = Variable<DateType>(defaultDateTime, {
    poll: [interval.value, () => {
        return {
            clock: {
                date: exec(`date "${formatDate.value}"`),
                time: exec(`date "${formatTime.value}"`),
            },
            year: exec('date "+%Y"'),
            month: exec('date "+%m"'),
            day: exec('date "+%d"'),
            weekday: exec('date "+%u"'),
            hour: exec('date "+%H"'),
            minute: exec('date "+%M"'),
        } as DateType
    }]
})

const time = Variable('0', {
    poll: [interval.value, ['date', formatTime.value]]
})

const uptime = Variable(0, {
    poll: [60_000, "cat /proc/uptime", line =>
        Number.parseInt(line.split(".")[0]) / 60,
    ],
})

// Get current directory
// const currentDir = exec("pwd")

const systemUpdates = Variable<number>(0, {
    poll: [options.bar.systemUpdates.checkInterval.value, 
        `${App.configDir}/ts/scripts/system_updates.sh`, updates => Number.parseInt(updates)],
})

// export const distro = GLib.get_os_info("ID")

// const divide = ([total, free]: string[]) => Number.parseInt(free) / Number.parseInt(total)
//
// export const cpu = Variable(0, {
//     poll: [intval, "top -b -n 1", out => divide(["100", out.split("\n")
//         .find(line => line.includes("Cpu(s)"))
//         ?.split(/\s+/)[1]
//         .replace(",", ".") || "0"])],
// })
//
// export const ram = Variable(0, {
//     poll: [intval, "free", out => divide(out.split("\n")
//         .find(line => line.includes("Mem:"))
//         ?.split(/\s+/)
//         .splice(1, 2) || ["1", "1"])],
// })
//
// export const temperature = Variable(0, {
//     poll: [intval, `cat ${tempPath}`, n => {
//         return Number.parseInt(n) / 100_000
//     }],
// })

export { dateTime, uptime, systemUpdates }
