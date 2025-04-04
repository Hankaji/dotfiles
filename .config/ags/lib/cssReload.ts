import { App } from "astal/gtk4";
import { execAsync, monitorFile } from "astal";

/* CSS Hot Reload */
async function monitorStyle() {
	const pathsToMonitor = [
		`${SRC}/styles/index.scss`,
		`${SRC}/styles/themes/tokyo-night.scss`,
	]; // Paths to monitor

	const mainScss = `${SRC}/styles/index.scss`; // SCSS input file to compile
	const css = `/tmp/style.css`; // CSS output file

	let isApplying = false;
	print(SRC);

	async function transpileAndApply() {
		if (isApplying) return;
		isApplying = true;

		try {
			await execAsync(`sass ${mainScss} ${css}`);
			App.reset_css();
			App.apply_css(css, true);
			print("CSS applied successfully!");
		} catch (error) {
			print("Error transpiling SCSS:", error);
			execAsync(`notify-send -u critical "Error transpiling SCSS" "${error}"`);
		} finally {
			isApplying = false;
		}
	}

	pathsToMonitor.forEach((path) => monitorFile(path, transpileAndApply));

	return transpileAndApply();
}

export default monitorStyle();
