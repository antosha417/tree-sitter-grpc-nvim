# Treesitter grammar for [grpc-nvim](https://github.com/hudclark/grpc-nvim)

## Neovim Installation
```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.grpcnvim = {
  install_info = {
    url = "~/prog/tree-sitter-grpc-nvim",
    revision = "master",
    files = { "src/parser.c", "src/scanner.cc" },
  },
  filetype = "grpcnvim",
}
```

