/* eslint-disable max-len */
import { type Opt } from "ts/lib/options"
import options from "ts/options"
import { bash, dependencies, sh } from "ts/lib/utils"
import App from "resource:///com/github/Aylur/ags/app.js"

const deps = [
    "font",
    "theme",
    "bar.flatButtons",
    "bar.position",
    "bar.battery.charging",
    "bar.battery.blocks",
]

const {
    dark,
    light,
    blur,
    scheme,
    padding,
    spacing,
    radius,
    useShadows,
    widget,
    border,
} = options.theme

const popoverPaddingMultiplier = 1.6

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = (dark: Opt<any> | string, light: Opt<any> | string) => scheme.value === "dark"
    ? `${dark}` : `${light}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $ = (name: string, value: string | Opt<any>) => `$${name}: ${value};`

const variables = () => [
    $("bg", blur.value ? `transparentize(${t(dark.bg, light.bg)}, ${blur.value / 100})` : t(dark.bg, light.bg)),
    $("fg", t(dark.fg, light.fg)),

    $("primary-bg", t(dark.primary.bg, light.primary.bg)),
    $("primary-fg", t(dark.primary.fg, light.primary.fg)),

    $("error-bg", t(dark.error.bg, light.error.bg)),
    $("error-fg", t(dark.error.fg, light.error.fg)),

    $("hover-bg", t(dark.hover.bg, light.hover.bg)),
    $("hover-fg", t(dark.hover.fg, light.hover.fg)),

    $("active-bg", t(dark.active.bg, light.active.bg)),
    $("active-fg", t(dark.active.fg, light.active.fg)),

    $("overlay-bg", `scale-color($color: $primary-bg, $lightness: ${t('5%', '-5%')})`),

    $("scheme", scheme),
    $("padding", `${padding}pt`),
    $("spacing", `${spacing}pt`),
    $("radius", `${radius}px`),
    $("transition", `all ${options.transition}ms ease;`),
    $("transition-time", `${options.transition}ms`),

    $("use-shadow", `${useShadows}`),
    $("shadow", `0 0px 6px 2px rgb(0,0,0)`),
    // $("shadow", `0 0px 4px 6px $primary-bg`),

    // $("widget-bg", `transparentize(${t(dark.widget, light.widget)}, ${widget.opacity.value / 100})`),

    // $("hover-bg", `transparentize(${t(dark.widget, light.widget)}, ${(widget.opacity.value * .9) / 100})`),
    // $("hover-fg", `lighten(${t(dark.fg, light.fg)}, 8%)`),

    $("border-width", `${border.width}px`),
    $("border-color", `transparentize(${t(dark.border, light.border)}, ${1 - (border.opacity.value / 100)})`),
    // $("border-color", `transparentize(${t(dark.border, light.border)}, ${border.opacity.value / 100})`),
    $("border", "$border-width solid $border-color"),

    $("active-gradient", `linear-gradient(to right, ${t(dark.primary.bg, light.primary.bg)}, darken(${t(dark.primary.bg, light.primary.bg)}, 4%))`),
    $("shadow-color", t("rgba(0,0,0,.6)", "rgba(0,0,0,.4)")),
    $("text-shadow", t("2pt 2pt 2pt $shadow-color", "none")),

    // $("popover-border-color", `transparentize(${t(dark.border, light.border)}, ${Math.max(((border.opacity.value - 1) / 100), 0)})`),
    // $("popover-padding", `$padding * ${popoverPaddingMultiplier}`),
    // $("popover-radius", radius.value === 0 ? "0" : "$radius + $popover-padding"),

    $("font-size", `${options.font.size}pt`),
    $("font-name", options.font.family),

    // etc
    // $("charging-bg", options.bar.battery.charging),
    // $("bar-battery-blocks", options.bar.battery.blocks),
    // $("bar-position", options.bar.position),
    // $("hyprland-gaps-multiplier", options.hyprland.gaps),
]

async function resetCss() {
    if (!dependencies("sass", "fd"))
        return

    try {
        // Create file with all above scss variables
        const vars = `${TMP}/variables.scss`
        await Utils.writeFile(variables().join("\n"), vars)

        // // Find global scss files in the config directory and import them
        const fd = await sh(`fd "global.scss" ${App.configDir}`)
        const files = fd.split(/\s+/).map(f => `@import '${f}';`)
        const scss = [`@import '${vars}';`, ...files].join("\n")
        const css = await bash`echo "${scss}" | sass --stdin`
        const file = `${TMP}/style.css`

        await Utils.writeFile(css, file)

        App.resetCss()
        App.applyCss(file)
        print("DEBUG: Applied new style")
    } catch (error) {
        logError(error)
    }
}

Utils.monitorFile(`${App.configDir}/scss/`, resetCss)
await resetCss()
