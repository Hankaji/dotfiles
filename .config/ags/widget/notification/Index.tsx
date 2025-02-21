import { App, Astal, Gtk, Widget } from "astal/gtk4";
import type { Gdk } from "astal/gtk4";
import Notification, { WIDTH } from "./Notification";
import { Variable } from "astal";
import animate from "../../lib/gtk_animation/gtk_animation";
import { CubicBezier, Easing } from "../../lib/gtk_animation/cubic_bezier";

enum ViewStates {
  Stack = 0,
  Full = 1,
}

function NotificationPopup(gdkmonitor: Gdk.Monitor) {
  const { TOP, RIGHT, BOTTOM } = Astal.WindowAnchor;

  const currentState = Variable(ViewStates.Full);

  const notificationWidgets = Variable<Gtk.Widget[]>([]);
  const cachedYPosition = Variable<number[]>([0]);

  const amount = Variable(0);
  const range = (n: number) => [...Array(n).keys()];

  const calculateClickRegion = (coordY: number) => {
    const lastWidget =
      notificationWidgets.get()[notificationWidgets.get().length - 1];
    const height = lastWidget.get_size_request()[1];

    // lastWidget.get_wind
    // Gtk.get_topl
    const rootWindow = lastWidget.get_root();

    // cairo

    print("Last widget Y to calculate: ", coordY);
    print("root: ", rootWindow);
    // rootWindow?.set_can_targetcan(true);
  };

  const f = new Gtk.Fixed();
  const testBox = Widget.Box({
    widthRequest: 500,
    heightRequest: 100,
    cssClasses: ["testBox"],
  });

  f.put(testBox, 50, 0);

  const target = Gtk.OverlayLayout;

  // On notification Added
  amount.subscribe((n) => {
    const idx = n - 1;

    notificationWidgets.set([
      ...notificationWidgets.get(),
      Widget.Box({
        heightRequest: 110,
        cssClasses: [`o1test-${idx}`, "notif"],
        type: "overlay",
      }),
    ]);

    if (notificationWidgets.get().length > 1) {
      const lastWidget =
        notificationWidgets.get()[notificationWidgets.get().length - 2];

      const spacing = 16;
      const height = lastWidget.get_size_request()[1];
      const coordY = lastWidget.get_allocation().y;

      print("Height: ", lastWidget.get_size_request());
      print("Coordinate y: ", lastWidget.get_allocation().y);
      const targetY = coordY + height + spacing;
      App.apply_css(
        `.o1test-${idx} {
        transform: translateY(${targetY}px);
      }`,
        false,
      );

      cachedYPosition.set([...cachedYPosition.get(), targetY]);
      // calculateClickRegion(targetY);
      return;
    }

    // calculateClickRegion(0);
  });

  currentState.subscribe((s) => {
    if (s === ViewStates.Stack) {
      const firstChildHeight = notificationWidgets
        .get()[0]
        .get_size_request()[1];

      let accumulativeTranslation = 0;
      for (const i of range(amount.get())) {
        const translation = () => {
          if (i === 0) return 0;
          if (i === 1) return firstChildHeight * 0.1; // 10% of first notification
          return 16; // +16px spacing for the rest
        };
        accumulativeTranslation += translation();

        App.apply_css(
          `.o1test-${i} {
            transform: translateY(${accumulativeTranslation}px) scale(${1 - i * 0.05}, ${1 - i * 0.05});
          }`,
          false,
        );
      }
    } else if (s === ViewStates.Full) {
      for (const i of range(amount.get())) {
        print(i);
        print(cachedYPosition.get());
        App.apply_css(
          `.o1test-${i} {
            transform: translateY(${cachedYPosition.get()[i]}px);
          }`,
          false,
        );
      }
    }
  });

  return (
    <window
      visible
      cssClasses={["NotificationPopup"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.NORMAL}
      anchor={TOP | RIGHT}
      application={App}
      hexpand={false}
      vexpand
      overflow={Gtk.Overflow.VISIBLE}
    >
      {/* Container */}
      <box vertical>
        {/* <label>This is a text so longggggggggggggggggggg</label> */}
        <box hexpand>
          <button
            hexpand
            cssName="btest"
            onClicked={() => amount.set(amount.get() + 1)}
          >
            Add Notif
          </button>
          <button
            hexpand
            cssName="btest"
            onClicked={async () => {
              await animate(
                testBox,
                {
                  x: 0,
                  y: 100,
                },
                {
                  duration: 300,
                  easing: new CubicBezier(0.17, 0.84, 0.44, 1).bind(),
                  // easing: Easing.easeOut.bind(),
                  fill: "forwards",
                },
              );
            }}
          >
            Remove Notif
          </button>
          <button
            hexpand
            cssName="btest"
            onClicked={() => {
              console.log("Before: ", testBox.get_allocation().x);
              f.move(testBox, testBox.get_allocation().x - 1, 100);
              console.log("After: ", testBox.get_allocation().x);
            }}
          >
            Test move
          </button>
        </box>
        <button
          cssName="btest"
          onClicked={() =>
            currentState.set(
              currentState.get() === ViewStates.Stack
                ? ViewStates.Full
                : ViewStates.Stack,
            )
          }
        >
          Toggle state
        </button>
        {f}
        {/* {notificationWidgets((ws) => ws)} */}
      </box>
    </window>
  );
}

export default NotificationPopup;
