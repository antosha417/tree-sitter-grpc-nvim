# Treesitter grammar for [grpc-nvim](https://github.com/hudclark/grpc-nvim)
<img width="1728" alt="Screen Shot 2023-02-16 at 23 54 17" src="https://user-images.githubusercontent.com/14187674/219495601-33d04b9a-0643-4ed7-a27b-5fb48372cdaa.png">

## Neovim Installation
1. Add custom parser into neovim config:
```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.grpcnvim = {
  install_info = {
    url = "https://github.com/antosha417/tree-sitter-grpc-nvim",
    revision = "master",
    files = { "src/parser.c", "src/scanner.cc" },
  },
  filetype = "grpcnvim",
}
```
2. Add autocmd to set filetype
```lua
local grpc_group = vim.api.nvim_create_augroup("grpc", { clear = true })
vim.api.nvim_create_autocmd(
  { 'BufNewFile', 'BufRead' },
  {
    group = grpc_group,
    pattern = { '*.grpc' },
    command = 'set ft=grpcnvim'
  }
)
```
3. Copy queries for syntax highlighting
```bash
$ mkdir -p ~/.config/nvim/after/queries/grpcnvim
$ cd ~/.config/nvim/after/queries/grpcnvim
$ wget https://raw.githubusercontent.com/antosha417/tree-sitter-grpc-nvim/master/queries/highlights.scm
$ wget https://raw.githubusercontent.com/antosha417/tree-sitter-grpc-nvim/master/queries/injections.scm
```
4. Finally, reload your config and run `:TSInstall bash json grpcnvim`

For more info go to https://github.com/nvim-treesitter/nvim-treesitter#adding-parsers

