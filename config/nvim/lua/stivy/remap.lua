-- vim.keymap.set mode, shortcut, action, config
local opts = {
  noremap = true,
  silent = true
}

vim.keymap.set("i", "jj", "<ESC>", opts)
vim.keymap.set("n", "<leader>V", ":vsplit<CR>", opts)
vim.keymap.set("n", "<esc>", ":noh<return><esc>", opts)
vim.keymap.set({ "i", "v", "n", "s" }, "<C-s>", "<cmd>w<cr><esc>", { desc = "Save file" })
vim.keymap.set({ "n" }, "<leader>w", "<C-w>", opts)
