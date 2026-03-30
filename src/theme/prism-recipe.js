(function (Prism) {
  // Roughly based on prism-twig.js from Prism.
  Prism.languages.jinja = {
    "jinja-comment": {
      pattern: /^\{#[\s\S]*?#\}$/,
      alias: "comment",
    },

    "jinja-tag": {
      pattern: /\$?\{([\{%])[\s\S]*?[\}%]\}/,
      alias: "tag",
      greedy: true,
      inside: {
        string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        filter: {
          pattern: /(\|\s*)[\w]+/,
          greedy: true,
          lookbehind: true,
          alias: "attr-name",
        },
        operator: [
          {
            pattern: /(\s)(?:if|else|set|and|in|is|not|or)(?=\s)/,
            lookbehind: true,
          },
          /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/,
        ],
        number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
      },
    },
  };

  Prism.languages.recipe = Prism.languages.insertBefore(
    "yaml",
    "scalar",
    Prism.languages.jinja,
  );
  Prism.languages.recipe.string.inside = Prism.languages.jinja;
})(Prism);
