const baseCommonRules = {
  // off
  "import/namespace": "off", // disabled because very low performance impact
  "no-prototype-builtins": "off",
  "no-unused-vars": "off",
  "import/no-unresolved": "off",
  "no-duplicate-imports": "off", // Use eslint-plugin-import instead

  // warn
  "no-constant-condition": "warn",
  "no-console": "warn",
  "no-param-reassign": ["warn", {props: false}],
  "rulesdir/no-disabled-checks": "warn",
  // "jest/no-conditional-expect": "warn",
  "rulesdir/no-invalid-selectors": "warn",
  //
  // // error
  "rulesdir/sort-imports": "error",
  "rulesdir/no-empty-lines-between-imports": "error",
  // "rulesdir/specified-exports": "error",
  "rulesdir/exports-location": "error",
  "rulesdir/multiline-ternary": "error",
  "rulesdir/no-multiline-object-key": "error",
  "rulesdir/object-prop-newline": "error",
  // "rulesdir/mono-imports": "error",
  "rulesdir/no-forbidden-imports": "error",
  "rulesdir/arguments-align": "error",
  "rulesdir/no-truethly-default-assign": "error",
  "rulesdir/partial-function-application": "error",
  "array-bracket-spacing": ["error", "never"],
  "array-element-newline": ["error", "consistent"],
  "no-trailing-spaces": "error",
  "comma-spacing": ["error", {before: false, after: true}],
  "func-call-spacing": "error",
  "function-call-argument-newline": ["error", "consistent"],
  "key-spacing": ["error", {mode: "strict"}],
  "operator-linebreak": "error",
  "newline-before-return": "error",
  "no-mixed-operators": "error",
  "arrow-spacing": "error",
  "arrow-body-style": ["error", "as-needed"],
  curly: "error",
  "brace-style": ["error", "1tbs"],
  "padded-blocks": [
    "error",
    {
      blocks: "never",
      classes: "never",
      switches: "never",
    },
  ],
  "max-len": [
    "error",
    140,
    2,
    {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignorePattern: "^import [^,]+ from |^export | implements | `.{30,}`",
    },
  ],
  "consistent-return": "error",
  // "import/no-duplicates": "error",
  "no-multiple-empty-lines": ["error", {max: 1}],
  "comma-dangle": ["error", "always-multiline"],
  semi: ["error", "always"],
  "arrow-parens": ["error", "always"],
  quotes: ["error", "double"],
  "space-before-function-paren": [
    "error",
    {
      anonymous: "always",
      named: "never",
      asyncArrow: "always",
    },
  ],
  "object-curly-spacing": ["error", "always"],
  "eol-last": ["error", "always"],
  indent: ["error", 2, {SwitchCase: 1}],
  "no-nested-ternary": "error",
  "no-unneeded-ternary": ["error", {defaultAssignment: false}],
  "no-empty": ["error", {allowEmptyCatch: true}],
  "newline-per-chained-call": ["error", {ignoreChainWithDepth: 3}],
  "no-empty-function": [
    "error",
    {
      allow: ["methods", "generatorMethods", "getters", "setters", "constructors", "asyncMethods"],
    },
  ],
};

export {baseCommonRules};
