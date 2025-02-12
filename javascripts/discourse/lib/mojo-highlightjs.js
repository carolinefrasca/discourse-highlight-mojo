/*
Language: Mojo
Description: Mojo is a compiler and Pythonic programming language for authoring performant and maintainable GPU code (known as kernels) within MAX.
Website: https://www.modular.com/mojo
Category: common
*/

export default function (hljs) {
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;

  const RESERVED_WORDS = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', '__disable_del', 
    'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 
    'match', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'struct', 'trait', 'try', 'while', 
    'with', 'yield'
  ];

  const BUILT_INS = [
    'print', 'len', 'range', 'int', 'float', 'str', 'bool', 'dict', 'list', 'tuple', 'set', 'sum', 'min', 
    'max', 'abs', 'any', 'all', 'map', 'filter', 'zip', 'enumerate', 'open', 'input', 'super'
  ];

  const LITERALS = ['__debug__', 'Ellipsis', 'False', 'None', 'NotImplemented', 'True'];

  const TYPES = ['Any', 'Callable', 'Dict', 'List', 'Sequence', 'Set', 'Tuple', 'Type', 'Union', 'Int', 'Float', 'Bool', 'String'];

  const KEYWORDS = {
    $pattern: /[A-Za-z_]\w*/,
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
      {
        // **Force Stronger String Highlighting**
        className: 'string',
        variants: [
          { begin: /f"/, end: /"/, contains: [{ match: /\{[^}]+\}/, className: 'subst' }] },
          { begin: /f'/, end: /'/, contains: [{ match: /\{[^}]+\}/, className: 'subst' }] },
          { begin: /"/, end: /"/ },
          { begin: /'/, end: /'/ }
        ]
      },
      {
        match: /\bself\b/,
        scope: 'variable.language'
      },
      {
        beginKeywords: "def",
        end: /[:(]/,
        contains: [
          { className: "title.function", begin: IDENT_RE }
        ]
      },
      {
        beginKeywords: "class",
        end: /[:(]/,
        contains: [
          { className: "title.class", begin: IDENT_RE }
        ]
      },
      {
        match: [/\bexcept/, /\s+/, IDENT_RE],
        scope: { 1: 'keyword', 3: 'variable' }
      },
      {
        match: /\b(List|Tuple|Dict|Set|Union)\[[^\]]+\]/,
        scope: 'type'
      },
      {
        match: /\b[A-Za-z_]\w*\.\w+\b/,
        scope: 'variable.property'
      },
      {
        match: /\b(print|len|range|input|enumerate|open|abs|sum|map|filter|zip)\b/,
        scope: 'built_in'
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/
      }
    ]
  };
}
