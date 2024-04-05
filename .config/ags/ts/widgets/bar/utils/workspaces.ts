import { Box, Button, Label } from "resource:///com/github/Aylur/ags/widget.js";
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { sh, range } from "ts/lib/utils"
import options from "ts/options";

const WorkspaceIcon = (id: number) => {
    switch (id) {
        case 1: return '';
        case 10: return ''
        default: return id;
    }
}

const dispatch = (arg: string | number) => {
    sh(`hyprctl dispatch workspace ${arg}`)
}

// function ExtractID(name: string | null) {
//     if (!name) return 0;
//     return parseInt(name.replace('workspace-', ''));
// }

function CompareStrings(a: string | null, b: string | null) {
    a = a || '';
    b = b || '';
    return a.localeCompare(b);
}

const Workspaces = (ws: number) => Widget.Box({
    class_name: 'workspaces',
    children: range(ws || 20).map(i => Widget.Label({
        attribute: i,
        vpack: "center",
        label: `${i}`,
        setup: self => self.hook(Hyprland, () => {
            self.toggleClassName("active", Hyprland.active.workspace.id === i)
            self.toggleClassName("occupied", (Hyprland.getWorkspace(i)?.windows || 0) > 0)
        }),
    })),
    setup: box => {
        if (ws === 0) {
            box.hook(Hyprland.active.workspace, () => box.children.map(btn => {
                btn.visible = Hyprland.workspaces.some(ws => ws.id === btn.attribute)
            }))
        }
    },
})

// export default () => Box({
//     class_name: 'workspaces',
//     spacing: options.spacing,
//     children: Hyprland.bind('workspaces').transform(ws => {
//         return ws.map(({ id }) => Button({
//             on_clicked: () => Hyprland.sendMessage(`dispatch workspace ${id}`),
//             name: `workspace-${id}`,
//             child: Label(`${id}`),
//             class_name: Hyprland.active.workspace.bind('id')
//                 .transform(i => `${i === id ? 'focused' : ''} workspace-${id}`),
//         })).sort((a, b) => CompareStrings(a.name, b.name)).filter(v => v.name != 'workspace--98');
//     }),
// });



export default () => Workspaces(options.bar.workspaces.count.value)
