import { CircularProgress, Icon } from 'resource:///com/github/Aylur/ags/widget.js';


export default () => CircularProgress({
    class_name: 'cpu-usage circular-progress',
    value: 0.5,
    child: Icon({
        class_name: 'cpu-icon',
        icon: 'cpu-symbolic' 
    }),
    // on_tick: () => print('tick'),
});
