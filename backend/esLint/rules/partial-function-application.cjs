"use strict";

module.exports = {
  create(context) {
    return {
      CallExpression: (node) => {
        if (node.callee.type === "CallExpression") {
          const name = node.callee.callee.name;

          if(name && /[Ee]pic/.test(name)) {
            return;
          }

          context.report({
            node,
            message: "Partial function application must be used - partially apply function and save to variable in outer scope",
          });
        }
      },
    };
  },
};
