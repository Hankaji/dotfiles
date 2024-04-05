import GLib from "types/@girs/glib-2.0/glib-2.0"

/** 
 * Debounce a function
 * 
 * @param callback function to call
 * @param wait time to wait in miliseconds
 * @returns a new function that will call the original function after the wait time
 */
function Debounce<T extends Function>(wait: number, callback: T) {
    let timeoutId: number | null = null;

    const debounced = function(this: any, ...args: any[]) {
        if (timeoutId !== null) {
            GLib.source_remove(timeoutId);
        }

        timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, wait, () => {
            callback.apply(this, args);
            timeoutId = null;
            return GLib.SOURCE_REMOVE;
        });
    };

    debounced.cancel = function() {
        if (timeoutId !== null) {
            GLib.source_remove(timeoutId);
            timeoutId = null;
        }
    }

    return debounced;
}

export default Debounce;
