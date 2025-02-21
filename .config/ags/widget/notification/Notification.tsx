import { Variable } from "astal";
import { Gtk, Widget } from "astal/gtk4";

const WIDTH = 500;

const Notification = () => {
  const reveal = Variable(false);

  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <label>This is a notification</label>
    </box>
  );
};

export default Notification;
export { WIDTH };
