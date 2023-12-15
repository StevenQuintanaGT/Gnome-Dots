local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system(
    { "git", "clone", "--filter=blob:none", "https://github.com/folke/lazy.nvim.git",
      "--branch=stable", -- latest stable release
      lazypath })
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({ "nvim-lualine/lualine.nvim",
  "nvim-tree/nvim-web-devicons",
  "j-hui/fidget.nvim",
  "goolord/alpha-nvim",
  "lukas-reineke/indent-blankline.nvim",
  "tpope/vim-eunuch",
  "ellisonleao/glow.nvim",
  "folke/trouble.nvim",
  "lewis6991/gitsigns.nvim",
  "chrisgrieser/nvim-spider",
  "echasnovski/mini.nvim",
  "HiPhish/nvim-ts-rainbow2",
  "chrisgrieser/nvim-various-textobjs",

  { "catppuccin/nvim", name = "catppuccin" },

  {
    "nvim-treesitter/nvim-treesitter",
    build = ":TSUpdate",
    dependencies = { 'JoosepAlviste/nvim-ts-context-commentstring', }
  },

  {
    'nvim-telescope/telescope.nvim',
    tag = '0.1.1',
    dependencies = { 'nvim-lua/plenary.nvim' }
  },

  {
    "jay-babu/mason-null-ls.nvim",
    event = { "BufReadPre", "BufNewFile" },
    dependencies = { "williamboman/mason.nvim", "jose-elias-alvarez/null-ls.nvim" }
  },

  {
    "utilyre/barbecue.nvim",
    name = "barbecue",
    version = "*",
    dependencies = { "SmiteshP/nvim-navic",
      "nvim-tree/nvim-web-devicons" -- optional dependency
    }
  },

  {
    "VonHeikemen/lsp-zero.nvim",
    dependencies = { -- LSP Support
      "neovim/nvim-lspconfig",
      "williamboman/mason.nvim",
      "williamboman/mason-lspconfig.nvim", -- Autocompletion
      "hrsh7th/nvim-cmp",
      "hrsh7th/cmp-buffer",
      "hrsh7th/cmp-path",
      "saadparwaiz1/cmp_luasnip",
      "hrsh7th/cmp-nvim-lsp",
      "hrsh7th/cmp-nvim-lua", -- Snippets
      "L3MON4D3/LuaSnip",
      "rafamadriz/friendly-snippets", }
  },

  {
    "nvim-tree/nvim-tree.lua",
    version = "*",
    dependencies = { "nvim-tree/nvim-web-devicons" },
    config = function()
      require("nvim-tree").setup {}
    end
  },

})
