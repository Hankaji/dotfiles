import { bind, Variable } from "astal";
import { Gtk } from "astal/gtk4";
import AstalHyprland from "gi://AstalHyprland?version=0.1";

const hyprland = AstalHyprland.get_default();

const workspaceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Hyprland = () => {
  return (
    <box spacing={8} cssClasses={["workspaces"]}>
      {workspaceIds.map((id) => {
        const classNames = Variable.derive(
          [bind(hyprland, "focusedWorkspace"), bind(hyprland, "workspaces")],
          (fw, wss) => [
            fw.id === id ? "focused" : "",
            wss.map((ws) => ws.id).includes(id) ? "occupied" : "",
          ],
        );

        return (
          <button
            valign={Gtk.Align.CENTER}
            cssClasses={classNames()}
            onClicked={() => hyprland.dispatch("workspace", id.toString())}
          />
        );
      })}
    </box>
  );
};

export default Hyprland;
