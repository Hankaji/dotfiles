-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

local km = vim.keymap
local opts = { noremap = true, silent = true }

-- Verticle movement
km.set("n", "<C-u>", "<C-u>zz", opts)
km.set("n", "<C-d>", "<C-d>zz", opts)

-- Select all
km.set("n", "<C-a>", "gg<S-v>G", opts)

-- Remap floating terminal
local lazyterm = function()
  LazyVim.terminal(nil, { cwd = LazyVim.root() })
end
km.set("n", "<A-/>", lazyterm, { desc = "Terminal (Root Dir)" })
km.set("n", "<A-/>", lazyterm, { desc = "Terminal (Root Dir)" })
km.set("t", "<A-/>", "<cmd>close<cr>", { desc = "Hide Terminal" })
km.set("t", "<A-_>", "<cmd>close<cr>", { desc = "which_key_ignore" })

-- Quick comment
km.set("n", "<C-_>", "", { desc = "which_key_ignore" })

-- [Git integration]
-- Gitsigns
km.set("n", "<leader>gp", ":Gitsigns preview_hunk<CR>", opts)

-- Resize window
km.del("n", "<C-Up>")
km.del("n", "<C-Down>")
km.del("n", "<C-Left>")
km.del("n", "<C-Right>")

km.set("n", "<A-Up>", "<cmd>resize +1<cr>", opts)
km.set("n", "<A-Down>", "<cmd>resize -1<cr>", opts)
km.set("n", "<A-Left>", "<cmd>vertical resize -1<cr>", opts)
km.set("n", "<A-Right>", "<cmd>vertical resize +1<cr>", opts)
