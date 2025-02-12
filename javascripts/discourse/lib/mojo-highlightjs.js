export default function (hljs) {
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;

  const RESERVED_WORDS = [
    'fn', 'struct', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 
    '__disable_del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 
    'is', 'lambda', 'match', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'trait', 'try', 'while', 
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
        // **✅ Strings Are Now Unique**
        className: 'string',
        variants: [
          { begin: /f"/, end: /"/, contains: [{ match: /\{[^}]+\}/, className: 'subst' }] },
          { begin: /f'/, end: /'/, contains: [{ match: /\{[^}]+\}/, className: 'subst' }] },
          { begin: /"[^"]*"/ },
          { begin: /'[^']*'/ }
        ]
      },
      {
        // **✅ Function Definitions (`fn`) Now Highlighted**
        beginKeywords: "fn",
        end: /[:(]/,
        contains: [
          { className: "title.function", begin: IDENT_RE }
        ]
      },
      {
        // **✅ Struct Definitions (`struct`) Now Highlighted**
        beginKeywords: "struct",
        end: /[:{]/,
        contains: [
          { className: "title.class", begin: IDENT_RE }
        ]
      },
      {
        // **✅ `self` Is Now Highlighted as a Keyword**
        match: /\bself\b/,
        className: "variable.language"
      },
      {
        // **✅ `self.property` Is Highlighted Correctly**
        match: /\bself\.\w+\b/,
        className: "variable.property"
      },
      {
        // **✅ Types Now Have Their Own Unique Color**
        match: /\b(List|Tuple|Dict|Set|Union|String|Int|Float|Bool)\b/,
        className: "type"
      },
      {
        match: /\b[A-Za-z_]\w*(?=\()/,
        className: "title.function.call"
      },
      {
        match: /\b(True|False|None)\b/,
        className: "literal"
      },
      {
        match: [/\bexcept/, /\s+/, IDENT_RE],
        scope: { 1: 'keyword', 3: 'variable' }
      },
      {
        match: /\b[A-Za-z_]\w*\.\w+\b/,
        className: 'variable.property'
      },
      {
        match: /\b(print|len|range|input|enumerate|open|abs|sum|map|filter|zip)\b/,
        className: 'built_in'
      },
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/
      }
    ]
  };
}
