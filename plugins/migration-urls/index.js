export default function (_, { routes }) {
  return {
    name: "migration-urls",
    async contentLoaded({ actions }) {
      const { addRoute } = actions;
      routes.map((route) => addRoute(route));
    },
  };
}
