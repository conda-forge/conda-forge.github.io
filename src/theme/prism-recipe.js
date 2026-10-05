// Prism syntax highlighting for Jinja and recipe formats.
// It defines two new languages:
// - "jinja" that highlights (conda-forge style) Jinja {{ ... }} (including
//   v1-style ${{ ... }}), {% ... %} and {# ... #} blocks, and the common
//   operators and filters.
// - "recipe" that combines YAML and Jinja highlighters, and additionally adds
//   highlighting for v0 selectors, v1 "if:" and "skip:" conditions, and shell
//   and cmd variables in strings.

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
      pattern: /(\S.*)# \[.*\]/,
      alias: "comment",
      lookbehind: true,
      inside: {
        selector: {
          pattern: /\[.*\]/,
          inside: Prism.languages.jinja.jinja_tag.inside,
        },
      },
    },

    multiline_v1_skip: {
      pattern: /skip:(\n\s*-.*)+/,
      alias: "atrule",
      inside: {
        selector: {
          pattern: /(-).*/,
          lookbehind: true,
          inside: Prism.languages.jinja.jinja_tag.inside,
        },
        punctuation: /:|-/,
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
