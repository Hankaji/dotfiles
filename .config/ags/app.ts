import { App } from "astal/gtk4";
import style from "./styles/index.scss";
import Bar from "./widget/bar/Bar";
import NotificationPopup from "./widget/notification/Index";
import cssReload from "./lib/cssReload";
import ActivateLinux from "./widget/activate_linux/Index";

cssReload;

App.start({
	css: style,
	main() {
		App.get_monitors().map(Bar);
		App.get_monitors().map(NotificationPopup);
		// App.get_monitors().map(ActivateLinux);
	},
});
