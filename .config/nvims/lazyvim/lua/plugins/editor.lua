return {
  {
    "nvim-neo-tree/neo-tree.nvim",
    opts = {
      window = {
        mappings = {
          ["P"] = { "toggle_preview", config = { use_float = false, use_image_nvim = true } },
        },
      },
    },
  },
  -- Codesnape: For taking screenshot
  {
    "mistricky/codesnap.nvim",
    build = "make build_generator",
    keys = {
      { "<leader>cs", "<cmd>CodeSnap<cr>", mode = "x", desc = "Save selected code snapshot into clipboard" },
      {
        "<leader>cS",
        "<cmd>CodeSnapSave<cr>",
        mode = "x",
        desc = "Save selected code snapshot in ~/Pictures/CodeSnap",
      },
    },
    opts = {
      save_path = "~/Pictures/CodeSnap",
      mac_window_bar = false,
      code_font_family = "JetBrainsMono Nerd Font",
      has_breadcrumbs = true,
      has_line_number = true,
      bg_padding = 2,
      bg_theme = "bamboo",
      watermark = "",
    },
  },
  -- Color picker
  { "nvchad/volt", lazy = true },
  { "nvchad/minty", lazy = true },
}
