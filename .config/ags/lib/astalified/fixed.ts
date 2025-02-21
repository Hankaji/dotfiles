import { GObject } from "astal";
import { Gtk, astalify, type ConstructProps } from "astal/gtk4";

type FixedProps = ConstructProps<Gtk.Fixed, Gtk.Fixed.ConstructorProps>;
const Fixed = astalify<Gtk.Fixed, Gtk.Fixed.ConstructorProps>(Gtk.Fixed, {});
