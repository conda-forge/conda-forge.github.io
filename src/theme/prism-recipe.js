(function (Prism) {
  // Roughly based on prism-twig.js from Prism.
  Prism.languages.jinja = {
    jinja_comment: {
      pattern: /^\{#[\s\S]*?#\}$/,
      alias: "comment",
    },

    jinja_tag: {
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

  yaml_extensions = {
    ...Prism.languages.jinja,

    selector_comment: {
      pattern: /# \[.*\]/,
      alias: "comment",
      inside: {
        selector: {
          pattern: /\[.*\]/,
          inside: Prism.languages.jinja.jinja_tag.inside,
        },
      },
    },

    v1_selector: {
      pattern: /(if|skip):.*/,
      alias: "atrule",
      inside: {
        selector: {
          pattern: /(:).*/,
          lookbehind: true,
          inside: Prism.languages.jinja.jinja_tag.inside,
        },
        punctuation: /:/,
      },
    },

    inline_shell_var: {
      pattern: /\$\w+|\$\{.*?\}|%\w+%/,
      alias: "selector",
    },
  };

  Prism.languages.recipe = {
    ...yaml_extensions,
    ...Prism.languages.yaml,
  };
  Prism.languages.recipe.string = { ...Prism.languages.yaml.string };
  Prism.languages.recipe.string.inside = Prism.languages.jinja;
})(Prism);
