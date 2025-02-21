return {
  {
    "L3MON4D3/LuaSnip",
    opts = function(_, opts)
      local cfg_path = vim.fn.stdpath("config")
      local snippets_dir = cfg_path .. "/lua/snippets"

      require("luasnip.loaders.from_snipmate").lazy_load({ paths = { snippets_dir } })
    end,
  },
}
