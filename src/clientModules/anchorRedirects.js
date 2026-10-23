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
  "/docs/maintainer/knowledge_base/": {
    "#only-using-required-components":
      "/docs/how-to/advanced/cuda/write-the-recipe/#only-use-the-required-cuda-components",
    "#supporting-both-cuda-and-non-cuda-variants":
      "/docs/how-to/advanced/cuda/write-the-recipe/#support-both-cuda-and-non-cuda-variants",
    "#compiling-for-all-supported-cuda-architectures":
      "/docs/how-to/advanced/cuda/configure-the-build-script/",
    "#cuda-cross-compilation":
      "/docs/how-to/advanced/cuda/configure-the-feedstock/#cross-compile",
    "#building-for-arm-tegra-devices": "/docs/how-to/advanced/cuda/tegra/",
    "#common-problems-and-known-issues":
      "/docs/how-to/advanced/cuda/write-the-recipe/#fix-nvcudadll-not-found-on-windows",
    "#common-problems-when-building-cuda-packages":
      "/docs/how-to/advanced/cuda/write-the-recipe/#fix-nvcudadll-not-found-on-windows",
    "#nvcuda-dll-cannot-be-found-on-windows":
      "/docs/how-to/advanced/cuda/write-the-recipe/#fix-nvcudadll-not-found-on-windows",
    "#my-feedstock-is-not-building-old-cuda-versions-anymore":
      "/docs/how-to/advanced/cuda/configure-the-feedstock/#adopting-a-new-cuda-version",
  },
};

export function onRouteDidUpdate({ location }) {
  const target = anchorRedirects[location.pathname]?.[location.hash];
  if (target) {
    window.location.replace(target);
  }
}
