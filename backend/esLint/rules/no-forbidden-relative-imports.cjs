"use strict";

const checkSource = (source, value) => {
  const lowerValue = value.toLowerCase();

  if (source instanceof RegExp) {
    if (!source.ignoreCase) {
      throw new Error("[no-forbidden-relative-imports] RegExp must be case insensitive");
    }

    return source.test(lowerValue);
  }

  return lowerValue.includes(`/${source.toLowerCase()}/`);
};

module.exports = {
  meta: {
    type: "problem",
    schema: [
      {
        type: "array",
        items: {
          type: "object",
          properties: {
            source: { type: "string" },
            from: {
              type: "array",
              items: { type: "string" },
            },
            compare: { type: "string" },
          },
          required: ["source", "from"],
          additionalProperties: false,
        },
        minItems: 1,
        uniqueItems: true,
      },
    ],
  },
  create(context) {
    const filename = context.getFilename();

    const options = context.options[0].filter((it) => checkSource(it.source, filename));

    if (options.length === 0) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (!source.startsWith(".")) {
          return;
        }

        options.forEach((option) => {
          option.from.forEach((it) => {
            const forbidden = checkSource(it, source);

            if (!forbidden) {
              return;
            }

            let compareFn;

            if (option.compare) {
              // TODO ^AD, ^EL. It's shitty fix. We cant pass functions in JSON.
              compareFn = new Function("filePath", "importPath", `return (${option.compare})(filePath, importPath);`);
            }

            if (!compareFn || compareFn(filename, source)) {
              context.report({
                node: node,
                message: `Relative imports to "${option.source}" from "${it}" is forbidden`,
              });
            }
          });
        });
      },
    };
  },
};
