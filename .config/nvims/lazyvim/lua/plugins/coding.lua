return {
  -- Auto tag
  {
    "windwp/nvim-ts-autotag",
    opts = {},
  },
  -- Text-case
  {
    "johmsalas/text-case.nvim",
    dependencies = { "nvim-telescope/telescope.nvim" },
    config = function()
      require("textcase").setup({})
      require("telescope").load_extension("textcase")
    end,
    keys = {
      "ga", -- Default invocation prefix
      { "ga.", "<cmd>TextCaseOpenTelescope<CR>", mode = { "n", "x" }, desc = "Telescope" },
    },
    cmd = {
      -- NOTE: The Subs command name can be customized via the option "substitude_command_name"
      "Subs",
      "TextCaseOpenTelescope",
      "TextCaseOpenTelescopeQuickChange",
      "TextCaseOpenTelescopeLSPChange",
      "TextCaseStartReplacingCommand",
    },
    -- If you want to use the interactive feature of the `Subs` command right away, text-case.nvim
    -- has to be loaded on startup. Otherwise, the interactive feature of the `Subs` will only be
    -- available after the first executing of it or after a keymap of text-case.nvim has been used.
    lazy = true,
  },
  -- Visual multi
  {
    "mg979/vim-visual-multi",
    branch = "master",
    lazy = false,
  },
  -- {
  --   "yetone/avante.nvim",
  --   event = "VeryLazy",
  --   lazy = false,
  --   version = false, -- set this if you want to always pull the latest change
  --   opts = {
  --     -- add any opts here
  --     ---@alias Provider "claude" | "openai" | "azure" | "gemini" | "cohere" | "copilot" | string
  --     provider = "ollama",
  --     auto_suggestions_provider = "copilot", -- Since auto-suggestions are a high-frequency operation and therefore expensive, it is recommended to specify an inexpensive provider or even a free provider: copilot
  --     openai = {
  --       endpoint = "https://api.openai.com/v1",
  --       model = "gpt-4o",
  --       temperature = 0,
  --       max_tokens = 4096,
  --     },
  --     -- Local LLM Ollama
  --     vendors = {
  --       ---@type AvanteProvider
  --       ollama = {
  --         ["local"] = true,
  --         endpoint = "127.0.0.1:11434",
  --         model = "codeqwen",
  --         parse_curl_args = function(opts, code_opts)
  --           return {
  --             url = opts.endpoint .. "/api/generate",
  --             headers = {
  --               ["Accept"] = "application/json",
  --               ["Content-Type"] = "application/json",
  --             },
  --             body = {
  --               model = opts.model,
  --               -- prompt = require("avante.providers").copilot.parse_message(code_opts), -- you can make your own message, but this is very advanced
  --               prompt = table.concat(code_opts.user_prompts, " "),
  --               max_tokens = 2048,
  --               stream = true,
  --             },
  --           }
  --         end,
  --         parse_response_data = function(data_stream, event_state, opts)
  --           require("avante.providers").openai.parse_response(data_stream, event_state, opts)
  --         end,
  --       },
  --     },
  --     behaviour = {
  --       auto_suggestions = false, -- Experimental stage
  --       auto_set_highlight_group = true,
  --       auto_set_keymaps = true,
  --       auto_apply_diff_after_generation = false,
  --       support_paste_from_clipboard = false,
  --     },
  --     mappings = {
  --       --- @class AvanteConflictMappings
  --       diff = {
  --         ours = "co",
  --         theirs = "ct",
  --         all_theirs = "ca",
  --         both = "cb",
  --         cursor = "cc",
  --         next = "]x",
  --         prev = "[x",
  --       },
  --       suggestion = {
  --         accept = "<M-l>",
  --         next = "<M-]>",
  --         prev = "<M-[>",
  --         dismiss = "<C-]>",
  --       },
  --       jump = {
  --         next = "]]",
  --         prev = "[[",
  --       },
  --       submit = {
  --         normal = "<CR>",
  --         insert = "<C-s>",
  --       },
  --     },
  --     hints = { enabled = true },
  --     windows = {
  --       ---@type "right" | "left" | "top" | "bottom"
  --       position = "right", -- the position of the sidebar
  --       wrap = true, -- similar to vim.o.wrap
  --       width = 30, -- default % based on available width
  --       sidebar_header = {
  --         align = "center", -- left, center, right for title
  --         rounded = true,
  --       },
  --     },
  --     highlights = {
  --       ---@type AvanteConflictHighlights
  --       diff = {
  --         current = "DiffText",
  --         incoming = "DiffAdd",
  --       },
  --     },
  --     --- @class AvanteConflictUserConfig
  --     diff = {
  --       autojump = true,
  --       ---@type string | fun(): any
  --       list_opener = "copen",
  --     },
  --   },
  --   -- if you want to build from source then do `make BUILD_FROM_SOURCE=true`
  --   build = "make",
  --   -- build = "powershell -ExecutionPolicy Bypass -File Build.ps1 -BuildFromSource false" -- for windows
  --   dependencies = {
  --     "stevearc/dressing.nvim",
  --     "nvim-lua/plenary.nvim",
  --     "MunifTanjim/nui.nvim",
  --     --- The below dependencies are optional,
  --     "echasnovski/mini.icons", -- or echasnovski/mini.icons
  --     "zbirenbaum/copilot.lua", -- for providers='copilot'
  --     {
  --       -- support for image pasting
  --       "HakonHarnes/img-clip.nvim",
  --       event = "VeryLazy",
  --       opts = {
  --         -- recommended settings
  --         default = {
  --           embed_image_as_base64 = false,
  --           prompt_for_file_name = false,
  --           drag_and_drop = {
  --             insert_mode = true,
  --           },
  --           -- required for Windows users
  --           use_absolute_path = true,
  --         },
  --       },
  --     },
  --     {
  --       -- Make sure to set this up properly if you have lazy=true
  --       "MeanderingProgrammer/render-markdown.nvim",
  --       opts = {
  --         file_types = { "markdown", "Avante" },
  --       },
  --       ft = { "markdown", "Avante" },
  --     },
  --   },
  -- },
}
