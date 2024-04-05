import Menu from './utils/menu';
import Workspaces from './utils/workspaces';
import Player from './utils/player';
import Clock from './utils/clock';
import SysTray from './utils/system_tray';
import CPUUsage from './utils/cpu_usage';
import SystemIndicator from './utils/systemIndicator';
import Backlight from './utils/backlight';
import VolumeButton from './utils/volume';
import Battery from './utils/battery';
import options from 'ts/options';

// --------------------------------------------------
// Bar widgets
// --------------------------------------------------
const widget = {
    menu: Menu,
    workspaces: Workspaces,
    player: Player,
    clock: Clock,
    sysTray: SysTray,
    cpuUsage: CPUUsage,
    systemIndicator: SystemIndicator,
    backlight: Backlight,
    volume: VolumeButton,
    battery: Battery,
    expander: () => Widget.Box({ expand: true }),
}
type BarWidgets = keyof typeof widget

// --------------------------------------------------
// Layout of the bar
// --------------------------------------------------
const { start, center, end } = options.bar.layout;
const widgetSpacing = options.bar.spacing.bind();

const Left = () => Widget.Box({
    name: 'left',
    spacing: widgetSpacing,
    children: start.bind().as(widgetList => widgetList.map(w => widget[w]()))
});

const Center = () => Widget.Box({
    name: 'center',
    spacing: widgetSpacing,
    children: center.bind().as(widgetList => widgetList.map(w => widget[w]()))
});

const Right = () => Widget.Box({
    name: 'right',
    hpack: 'end',
    spacing: widgetSpacing,
    children: end.bind().as(widgetList => widgetList.map(w => widget[w]()))
});

// --------------------------------------------------
// The status bar
// --------------------------------------------------
export default (monitor: number) => Widget.Window({
    name: `bar-${monitor}`, // name has to be unique
    class_name: 'bar',
    monitor,
    anchor: ['top', 'left', 'right'],
    exclusivity: 'exclusive',
    child: Widget.CenterBox({
        class_name: 'bar-container',
        start_widget: Left(),
        center_widget: Center(),
        end_widget: Right(),
    }),
});

export { BarWidgets }
