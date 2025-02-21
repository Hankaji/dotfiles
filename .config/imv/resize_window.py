import os


def expect_env(value: str) -> str:
    env_value = os.getenv(value)
    if env_value is None:
        raise ValueError(
            f"{env_value} is expected to have value but empty for some reasons."
        )
    else:
        return env_value


# Collect the exposed env var from imv
imv_width = expect_env("imv_width")
imv_height = expect_env("imv_height")
imv_scale = expect_env("imv_scale")

# Convert str to int
imv_width = int(imv_width)
imv_height = int(imv_height)
imv_scale = int(imv_scale)

# Calculate the actual img size
curr_width = int(imv_width * (imv_scale / 100))
curr_height = int(imv_height * (imv_scale / 100))

# Resize the window to the image size
os.system(f"hyprctl dispatch resizeactive exact {curr_width} {curr_height}")
