return {
  {
    "szebniok/tree-sitter-wgsl",
    config = function()
      ---@class ParserInfo[]
      local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
      parser_config.wgsl = {
        install_info = {
          url = "https://github.com/szebniok/tree-sitter-wgsl",
          files = { "src/parser.c" },
        },
      }

      vim.wo.foldmethod = "expr"
      vim.wo.foldexpr = "nvim_treesitter#foldexpr()"
      vim.o.foldlevelstart = 99 -- do not close folds when a buffer is opened
    end,
  },
  {
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = { "wgsl" },
      highlight = {
        enable = true,
      },
      incremental_selection = {
        enable = true,
        keymaps = {
          init_selection = "gnn",
          node_incremental = "grn",
          scope_incremental = "grc",
          node_decremental = "grm",
        },
      },
      -- context_commentstring = {
      --   config = {
      --     enable = true,
      --     enable_autocmd = false,
      --     wgsl = "// %s",
      --   },
      -- },
    },
  },
  {
    "folke/ts-comments.nvim",
    opts = {
      lang = {
        wgsl = "// %s",
      },
    },
  },
}
