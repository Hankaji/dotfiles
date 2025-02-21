import { GLib } from "astal/gobject";
import { Widget } from "astal/gtk3";
import { Gtk } from "astal/gtk4";

type KeyframeValue = number | number[];
type Keyframes = { [property: string]: KeyframeValue };

type EasingFunc = (t: number) => number;

interface AnimateOptions {
  duration?: number;
  easing?: EasingFunc;
  fill?: "forwards" | "none";
  delay?: number;
}

const DEFAULT_OPTIONS: Required<AnimateOptions> = {
  duration: 1000,
  easing: (t) => t,
  fill: "none",
  delay: 0,
};

interface PropertyHandlerFunc {
  get: (widget: Gtk.Widget) => number;
  set: (widget: Gtk.Widget, value: number) => void;
}

const propertyHandlers = new Map<string, PropertyHandlerFunc>([
  [
    "x",
    {
      get: (widget: Gtk.Widget) => widget.get_allocation().x - 1,
      set: (widget: Gtk.Widget, value: number) => {
        if (widget.get_parent() instanceof Gtk.Fixed) {
          (widget.get_parent() as Gtk.Fixed).move(
            widget,
            Math.round(value),
            widget.get_allocation().y - 1,
          );
        }
      },
    },
  ],
  [
    "y",
    {
      get: (widget) => widget.get_allocation().y - 1,
      set: (widget, value) => {
        if (widget.get_parent() instanceof Gtk.Fixed) {
          (widget.get_parent() as Gtk.Fixed).move(
            widget,
            widget.get_allocation().x - 1,
            Math.round(value),
          );
        }
      },
    },
  ],
  [
    "opacity",
    {
      get: (widget) => widget.opacity,
      set: (widget, value) => {
        widget.opacity = value;
      },
    },
  ],
  [
    "width",
    {
      get: (widget) => widget.get_allocated_width(),
      set: (widget, value) => {
        widget.set_size_request(Math.round(value), -1);
      },
    },
  ],
  [
    "height",
    {
      get: (widget) => widget.get_allocated_height(),
      set: (widget, value) => {
        widget.set_size_request(-1, Math.round(value));
      },
    },
  ],
]);

const registerHandler = (
  property: string,
  handler: PropertyHandlerFunc,
): void => {
  propertyHandlers.set(property, handler);
};

const activeAnimations = new Map<
  number,
  {
    widget: Gtk.Widget;
    property: string;
    startTime: number;
    keyframes: number[];
    options: Required<AnimateOptions>;
  }
>();

const animate = async (
  widget: Gtk.Widget,
  keyframes: Keyframes,
  opts: AnimateOptions = {},
): Promise<void> => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...opts };
  const animations: Promise<void>[] = [];

  for (const [property, values] of Object.entries(keyframes)) {
    const propHandler = propertyHandlers.get(property);
    if (!propHandler) {
      console.warn(`No handler registered for property: ${property}`);
      continue;
    }

    // const keyframeValues = Array.isArray(values) ? values : [values];
    let keyframeValues: number[];
    if (Array.isArray(values)) {
      if (values.length > 1) keyframeValues = values;
      else keyframeValues = [propHandler.get(widget), ...values];
    } else {
      const currentValue = propHandler.get(widget);
      keyframeValues = [currentValue, values];
    }

    const animation = new Promise<void>((resolve) => {
      const animationId = Math.random();
      const startTime = GLib.get_monotonic_time() / 1000 + mergedOptions.delay;

      activeAnimations.set(animationId, {
        widget,
        property,
        startTime,
        keyframes: keyframeValues,
        options: mergedOptions,
      });

      const timeoutHandle = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 16, () => {
        const now = GLib.get_monotonic_time() / 1000;
        const animation = activeAnimations.get(animationId);

        if (!animation) return false;

        if (now < animation.startTime) {
          return true; // Keep waiting for delay
        }

        const elapsed = now - animation.startTime;
        const duration = animation.options.duration;
        let progress = Math.min(elapsed / duration, 1);

        // Animation complete
        if (progress >= 1) {
          const finalValue =
            animation.keyframes[animation.keyframes.length - 1];
          if (animation.options.fill === "forwards") {
            propHandler.set(widget, finalValue);
          }
          activeAnimations.delete(animationId);
          resolve();
          return false;
        }

        progress = animation.options.easing(progress);

        // Calculate current value
        const startIdx = Math.floor(
          progress * (animation.keyframes.length - 1),
        );
        const endIdx = Math.min(startIdx + 1, animation.keyframes.length - 1);
        const segmentProgress =
          (progress * (animation.keyframes.length - 1)) % 1;

        const currentValue =
          animation.keyframes[startIdx] +
          (animation.keyframes[endIdx] - animation.keyframes[startIdx]) *
          segmentProgress;

        propHandler.set(widget, currentValue);
        return true;
      });

      GLib.timeout_add(
        GLib.PRIORITY_DEFAULT,
        mergedOptions.duration + mergedOptions.delay,
        () => {
          GLib.source_remove(timeoutHandle);
          return false;
        },
      );
    });

    animations.push(animation);
  }

  return Promise.all(animations).then(() => { });
};

export default animate;
export { registerHandler };
export type { EasingFunc };
