import "ts/lib/sessions"
import { type Config } from "types/app"
import Bar from './widgets/bar/bar';
import NotificationPopup from './widgets/notification/notification_popup';
import AppLauncher from './widgets/applauncher/applauncher';
import Menu from './widgets/menu/menu';
import StatusNotification from "./widgets/notification/status_notification";
import NotificationCenter from "./widgets/notification_center/notification_center";
import Gtk from 'types/@girs/gtk-3.0/gtk-3.0';
import "scss/style";
import options from "./options";
import { dependencies } from "./lib/utils";
import App from "resource:///com/github/Aylur/ags/app.js";

// Check for dependencies
dependencies(
    'sass',
    'fd',
    'pamixer'
)

const styleSheetPath = `${TMP}/style.css`
const assetsPath = `${App.configDir}/assets`

// Add icon theme path
const IconThemePath = [
    assetsPath,
    `${assetsPath}/fallback`,
]
for (const path of IconThemePath) {
    Gtk.IconTheme.get_default().append_search_path(path)
}

const transition = options.transition.value;

// Config
export default {
    // style: styleSheetPath,
    icons: assetsPath,
    windows: [
        // this is where window definitions will go
        Bar(0),
        NotificationPopup(0),
        StatusNotification(),
        NotificationCenter(),
        AppLauncher(),
        Menu(),
    ],
    onConfigParsed: function() {
        // code that runs after this object is loaded
    },
    onWindowToggled: function (windowName, visible) {
        print(`${windowName} is ${visible ? 'visible' : 'hidden'}`)
    },
    closeWindowDelay: {
        "applauncher": transition,
        "notification-center": transition,
    }
} as Config
