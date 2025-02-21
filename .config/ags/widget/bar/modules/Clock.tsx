import { exec, Variable } from "astal";
import { Gtk } from "astal/gtk4";

const time = Variable("").poll(1000, "date +%H:%M");
const date = Variable(exec('date "+%A, %b %d"'));

const Clock = (): JSX.Element => {
	return (
		<menubutton>
			<box>
				<label label={date()} /> <label label={time()} />
			</box>
			<popover>
				<Gtk.Calendar />
			</popover>
		</menubutton>
	);
};

export default Clock;
