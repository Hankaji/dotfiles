import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import Clock from "./modules/Clock";
import Hyprland from "./modules/Hyprland";

export default function Bar(gdkmonitor: Gdk.Monitor) {
	const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

	return (
		<window
			visible
			cssClasses={["Bar"]}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.EXCLUSIVE}
			anchor={TOP | LEFT | RIGHT}
			application={App}
		>
			<centerbox hexpand orientation={0}>
				<box hexpand halign={Gtk.Align.START}>
					<Hyprland />
				</box>
				<box hexpand halign={Gtk.Align.CENTER}>
					<Clock />
				</box>
				<box hexpand halign={Gtk.Align.END}>
					<label label={"End"} />
				</box>
			</centerbox>
		</window>
	);
}
