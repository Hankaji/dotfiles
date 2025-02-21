import { App, Astal, Gtk, Gdk } from "astal/gtk4";

function ActivateLinux(gdkmonitor: Gdk.Monitor) {
	const { BOTTOM, RIGHT } = Astal.WindowAnchor;

	return (
		<window
			visible
			cssClasses={["ActivateLinux"]}
			gdkmonitor={gdkmonitor}
			exclusivity={Astal.Exclusivity.NORMAL}
			anchor={BOTTOM | RIGHT}
			application={App}
		>
			<box vertical halign={Gtk.Align.START}>
				<label halign={Gtk.Align.START}>Activate Linux</label>
				<label halign={Gtk.Align.START}>Go to setting to activate Linux</label>
			</box>
		</window>
	);
}

export default ActivateLinux;
