return {
  "atiladefreitas/dooing",
  config = function()
    require("dooing").setup({
      -- your custom config here (optional)
      window = {
        width = 200,
        height = 60,
      },
    })
  end,
}
