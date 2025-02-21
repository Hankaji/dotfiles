return {
  {
    "imsnif/kdl.vim",
    config = function() end,
  },
  {
    "ron-rs/ron.vim",
  },
  {
    "NoahTheDuke/vim-just",
  },
  { "habamax/vim-godot" },
  {
    "lervag/vimtex",
    keys = {
      { "<localLeader>c", "<cmd>update<cr><cmd>VimtexCompileSS<cr>", desc = "SS Compile" },
    },
    config = function()
      vim.g.vimtex_view_method = "zathura"
      vim.g.vimtex_compiler_latexmk = {
        out_dir = ".tex_builds",
      }
    end,
  },
}
