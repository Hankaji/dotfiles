return {
  {
    "mrcjkb/rustaceanvim",
    opts = {
      server = {
        default_settings = {
          -- rust-analyzer language server configuration
          ["rust-analyzer"] = {
            procMacro = {
              enable = true,
              ignored = {
                ["async-trait"] = {},
              },
            },
          },
        },
      },
    },
  },
}
