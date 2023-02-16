const bashGrammar = require("tree-sitter-bash/grammar");

module.exports = grammar(bashGrammar, {
  name: "grpcnvim",

  extras: $ => [
    $.comment,
    /\\?\s/,
  ],

  rules: {
    program: $ => repeat($.grpc_request),

    grpc_request: $ => prec.right(seq($.command, optional($.json_object))),

    command: $ => prec.left(seq(
      field("name", "grpc"),
      repeat(field("argument", choice(
        $._literal,
        seq(
          choice('=~', '=='),
          choice($._literal, $.regex)
        )
      )))
    )),

    _json_value: $ => choice(
      $.json_object,
      $.json_array,
      $.json_number,
      $.json_string,
      $.json_true,
      $.json_false,
      $.json_null
    ),

    json_object: $ => seq(
      "{", commaSep($.json_pair), "}"
    ),

    json_pair: $ => seq(
      field("key", choice($.json_string, $.json_number)),
      ":",
      field("value", $._json_value)
    ),

    json_array: $ => seq(
      "[", commaSep($._json_value), "]"
    ),

    json_string: $ => choice(
      seq('"', '"'),
      seq('"', $.json_string_content, '"')
    ),

    json_string_content: $ => repeat1(choice(
      token.immediate(/[^\\"\n]+/),
      $.json_escape_sequence
    )),

    json_escape_sequence: $ => token.immediate(seq(
      '\\',
      /(\"|\\|\/|b|n|r|t|u)/
    )),

    json_number: $ => {
      const hex_literal = seq(
        choice('0x', '0X'),
        /[\da-fA-F]+/
      )

      const decimal_digits = /\d+/
      const signed_integer = seq(optional(choice('-','+')), decimal_digits)
      const exponent_part = seq(choice('e', 'E'), signed_integer)

      const binary_literal = seq(choice('0b', '0B'), /[0-1]+/)

      const octal_literal = seq(choice('0o', '0O'), /[0-7]+/)

      const decimal_integer_literal = seq(
        optional(choice('-','+')),
        choice(
          '0',
          seq(/[1-9]/, optional(decimal_digits))
        )
      )

      const decimal_literal = choice(
        seq(decimal_integer_literal, '.', optional(decimal_digits), optional(exponent_part)),
        seq('.', decimal_digits, optional(exponent_part)),
        seq(decimal_integer_literal, optional(exponent_part))
      )

      return token(choice(
        hex_literal,
        decimal_literal,
        binary_literal,
        octal_literal
      ))
    },

    json_true: $ => "true",

    json_false: $ => "false",

    json_null: $ => "null"
  },
});

function commaSep1 (rule) {
  return seq(rule, repeat(seq(",", rule)))
}

function commaSep (rule) {
  return optional(commaSep1(rule))
}
