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

  Prism.languages.recipe = Prism.languages.extend("jinja", {
    scalar: Prism.languages.yaml.scalar,
    comment: Prism.languages.yaml.comment,
    key: Prism.languages.yaml.key,
    directive: Prism.languages.yaml.directive,
    datetime: Prism.languages.yaml.datetime,
    boolean: Prism.languages.yaml.boolean,
    null: Prism.languages.yaml.null,
    string: {
      pattern: Prism.languages.yaml.string.pattern,
      lookbehind: Prism.languages.yaml.string.lookbehind,
      greedy: Prism.languages.yaml.string.greedy,
      inside: Prism.languages.jinja,
    },
    number: Prism.languages.yaml.number,
    tag: Prism.languages.yaml.tag,
    important: Prism.languages.yaml.important,
  });
})(Prism);
