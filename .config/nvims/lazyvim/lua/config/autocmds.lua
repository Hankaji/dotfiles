-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

-- Rename the current zellij tab after nvim's current working directory
vim.api.nvim_create_autocmd({ "DirChanged", "WinEnter", "BufEnter" }, {
  pattern = "*",
  callback = function()
    vim.fn.system('zellij action rename-tab "' .. vim.fn.fnamemodify(vim.fn.getcwd(), ":t") .. '"')
  end,
})

vim.api.nvim_create_autocmd("FileType", {
  pattern = "java",
  callback = function()
    local tmp_folder = "/tmp/java"

    if not vim.fn.isdirectory(tmp_folder) then
      vim.fn.mkdir(tmp_folder, "-p")
    end

    vim.keymap.set("n", "<leader>jr", function()
      local curr_file_name = vim.fn.expand("%:t:r")

      local java_run = "javac " .. curr_file_name .. ".java && java " .. curr_file_name
      ---@param cmd? string | string[]
      ---@param opts? snacks.terminal.Opts| {create?: boolean}
      ---@return snacks.win? terminal, boolean? created
      Snacks.terminal(java_run, {
        interactive = false,
      })
    end, { noremap = true, silent = true, desc = "Compile and run current java file" })
  end,
})
