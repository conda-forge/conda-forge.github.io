// Redirect old section anchors (fragments are never sent to the server, so the
// client-redirects plugin cannot handle them) from the page they used to live on
// to the section that replaced them.
const anchorRedirects = {
  "/docs/user/tipsandtricks/": {
    "#installing-packages-for-gpus-and-cpus":
      "/docs/user/cuda/#cuda-without-a-gpu",
    "#installing-cuda-enabled-packages-like-tensorflow-and-pytorch":
      "/docs/user/cuda/#cuda-without-a-gpu",
  },
};

export function onRouteDidUpdate({ location }) {
  const target = anchorRedirects[location.pathname]?.[location.hash];
  if (target) {
    window.location.replace(target);
  }
}
