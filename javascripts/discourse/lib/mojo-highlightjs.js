/*
Language: Mojo
Description: Mojo is a compiler and Pythonic programming language for authoring performant and maintainable GPU code (known as kernels) within MAX.  
Website: https://www.modular.com/mojo
Category: common
*/

export default function(hljs) {
  const regex = hljs.regex;
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;
  const RESERVED_WORDS = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', '__disable_del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'match', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'struct', 'trait', 'try', 'while', 'with', 'yield'
  ];

  const BUILT_INS = [
    'always_inline', 'and', 'as', 'bool', 'bytearray', 'bytes', 'break', 'case', 'capturing', 'classmethod', 'complex', 'continue', 'dict', 'div', 'elif', 'else', 'escaping', 'except', 'export', 'finally', 'float', 'for', 'from', 'frozenset', 'func', 'if', 'import', 'in', 'include', 'int', 'interface', 'is', 'isnot', 'iterator', 'let', 'list', 'method', 'mixin', '__mlir_attr', '__mlir_op', '__mlir_type', 'mod', 'not', 'object', 'of', 'or', 'out', 'parameter', 'property', 'ptr', 'raise', 'ref', 'return', 'set', 'SIMD', 'slice', 'staticmethod', 'str', 'throws', 'try', 'tuple', 'type', 'var', 'when', 'while', 'xor', 'yield'
  ];

  const LITERALS = ['__debug__', 'Ellipsis', 'False', 'None', 'NotImplemented', 'True'];
  const TYPES = ['Any', 'Callable', 'Dict', 'List', 'Sequence', 'Set', 'Tuple', 'Type', 'Union'];

  const KEYWORDS = {
    $pattern: /[A-Za-z]\w+|__\w+__/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    type: TYPES
  };

  return {
    name: 'Mojo',
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /(<\/|\?)|=>/,
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      {
        match: /\bself\b/,
        scope: 'variable.language'
      },
      {
        match: [ /\bdef/, /\s+/, IDENT_RE ],
        scope: { 1: 'keyword', 3: 'title.function' },
        contains: []
      },
      {
        variants: [
          { match: [ /\bclass/, /\s+/, IDENT_RE, /\s*/, /\(\s*/, IDENT_RE, /\s*\)/ ] },
          { match: [ /\bclass/, /\s+/, IDENT_RE ] }
        ],
        scope: { 1: 'keyword', 3: 'title.class', 6: 'title.class.inherited' }
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/
      }
    ]
  };
}
