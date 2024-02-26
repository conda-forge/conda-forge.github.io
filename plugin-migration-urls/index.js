export default function (_, { routes }) {
  return {
    name: "plugin-migration-urls",
    async contentLoaded({ actions }) {
      const { addRoute } = actions;
      routes.map((route) => addRoute(route));
    },
  };
}
