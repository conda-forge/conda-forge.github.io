---
title: 'FAQ'
---

<a id="faq"></a>

# FAQ

<a id="mfaq-py37-selector"></a>

<a id="why-does-conda-build-ignore-the-py37-selector-in-meta-yaml"></a>

## Why does conda-build ignore the `py37` selector in meta.yaml?

TL;DR: replace `py37` with `py==37`.

conda-build has changed the selector syntax.
You are now encouraged to use `py==<version>`, instead of `py<version>`.
While the legacy selectors `py27` and `py36` are still valid, selectors `py37` and higher are no longer valid.

Please use the new syntax `py==27`, `py==36` and `py==37` to avoid confusion.

:::note[Related links]

- **Selectors in conda-build documentation** ([Preprocessing selectors](https://docs.conda.io/projects/conda-build/en/stable/resources/define-metadata.html#preprocessing-selectors))
- **Linter: deprecate the use of py27, py36** ([conda-smithy/#1026](https://github.com/conda-forge/conda-smithy/issues/1026))

:::

<a id="mfaq-build-number-1000"></a>

<a id="what-do-build-numbers-above-1000-signify-how-do-i-treat-them"></a>

## What do build numbers above 1000 signify? How do I treat them?

TL;DR: there is no need for build numbers larger than 1000 anymore.

When you update a feedstock that still uses build numbers > 1000, the following rules apply:

- When you increase the version, reset the build number back to 0 (e.g. `1005 -> 0`).
- When the version stays the same and you need to upload a new package, increase the build number by 1 (e.g. `1005 -> 1006`).

**Backstory:** Build numbers of 1000 and larger are a relic from the compiler migration, where a build number offset of 1000 signified that a package was migrated to the new compilers.
Since the completion of the compiler migration, this offsetting is not needed anymore.
However, we cannot simply subtract the offset without updating the version, due to higher build numbers being preferred by the solver.
Therefore build numbers above 1000 will gradually vanish as packages get updated to newer versions.

<a id="mfaq-windows-cmake"></a>

<a id="how-to-fix-cmake-not-finding-msbuild-exe-on-azure-windows-builds"></a>

## How to fix CMake not finding MSBuild.exe on Azure Windows builds?

TL;DR: Use `Ninja` or `NMake Makefiles JOM` as the CMake generator (`cmake -G"Ninja"`), and add `build` requirements for `ninja` or `jom`.

Sadly in the Azure Windows images, MSBuild.exe is not correctly setup for CMake builds with the `Visual Studio` generators. To work around this, you can use a different CMake generator, e.g. `cmake -GNinja` or `cmake -G"NMake Makefiles JOM"`. These two are preferred because they allow for concurrent builds in contrast to e.g. only using `cmake -G"NMake Makefiles"`

<a id="mfaq-anaconda-delay"></a>

<a id="why-does-my-new-version-appear-on-anaconda-cloud-but-is-not-installable-with-conda"></a>

## Why does my new version appear on Anaconda Cloud, but is not installable with conda?

For certain, high-traffic channels (main & conda-forge), Anaconda uses a [CDN](https://cloudflare.com/learning/cdn/what-is-a-cdn/) to decrease costs. Therefore, packages will show up on the [Anaconda Cloud](https://anaconda.org) about 10 minutes before they are downloadable via conda. You can use `conda search <pkg>` to see if the package is installable, because this command reads from the CDN.

If the CDN sync is not happening timely, please check the [status page](https://conda-forge.org/status/) for the CDN cloning status and see if any problem occurs. If the clone is not sync'ing, you can open a CDN Issue in the [Anaconda Issues repo](https://github.com/ContinuumIO/anaconda-issues).

<a id="mfaq-mamba-local"></a>

<a id="how-can-i-make-local-debugging-faster"></a>

## How can I make local debugging faster?

If you prefer to debug your recipes locally and not use the provided [scripts](updating_pkgs.md#testing-changes-locally) but instead your own setup, you may also use the mamba solver through `mambabuild`. It not only has a faster solve speed but also prints better error messages that make debugging simpler.

To do this, first install the solver and then build the recipe like you normally would

- `conda install boa -c conda-forge`
- `conda mambabuild myrecipe`

For more details visit [this](https://boa-build.readthedocs.io/en/stable/mambabuild.html) page.

<a id="mfaq-conda-verify"></a>

<a id="i-am-seeing-importing-conda-verify-failed-error-message-during-build-what-do-i-do"></a>

## I am seeing `Importing conda-verify failed.` error message during build. What do I do?

```shell-session
Importing conda-verify failed. Please be sure to test your packages. conda install conda-verify to make this message go away.
```

You are seeing this error message because by default, conda-build uses conda-verify to ensure that your recipe and package meet some minimum sanity checks.
This message can be safely ignored as conda-forge doesn't use conda-verify.

<a id="mfaq-version-update"></a>

<a id="when-the-bot-creates-a-pull-request-to-a-feedstock-to-update-the-version-should-i-approve-the-pull-request-and-wait-with-merging-until-everybody-else-that-is-a-code-owner-has-approved-the-pr"></a>

## When the bot creates a pull request to a feedstock to update the version, should I approve the pull request and wait with merging until everybody else that is a code owner has approved the PR?

There is no need to approve the PR. Every maintainer can verify and merge the bot PR without waiting on the approval of the other maintainers.

<a id="mfaq-docker-139"></a>

<a id="how-to-fix-build-locally-py-fails-with-exit-code-139"></a>

## How to fix "build-locally.py fails with exit code 139"?

With Linux Kernel 4.11 there were some changes in the `vsyscall` linking. Depending on your distribution this may cause the above error. You can fix that on Debian by editing `/etc/default/grub` and specifiy `GRUB_CMDLINE_LINUX_DEFAULT="vsyscall=emulate"` in this file. Afterwards, you need to run `update-grub` and reboot your system. On other Linux distributions the fix is similar but you need to edit a different configuration file to change the Linux kernel cmdline. This workaround is only needed for images based on CentOS 6 (`cos6`). You could also workaround this by forcing the CentOS 7 based images using `DOCKER_IMAGE=quay.io/condaforge/linux-anvil-cos7-x86_64 ./build-locally.py`.

The exit code 139 itself actually is the general exit code for a segmentation fault. This could also mean that you have run into a different issue but the above issue is the most likely one with our CentOS 6-based images.

<a id="mfaq-package-submit"></a>

<a id="is-it-necessary-for-me-to-be-an-upstream-maintainer-of-the-package-i-submit-to-conda-forge"></a>

## Is it necessary for me to be an upstream maintainer of the package I submit to conda-forge?

Everybody can submit a package to conda-forge, irrespective of whether they maintain the upstream version or not. Additionally, it's not required but considered good practice to inform the upstream of a new package and invite them to be maintainers as well.

<a id="mfaq-libgl-so-1"></a>

<a id="how-do-i-fix-the-libgl-so-1-import-error"></a>

## How do I fix the `libGL.so.1` import error?

Error:

```shell-session
ImportError: libGL.so.1: cannot open shared object file: No such file or directory
```

To fix the error, create a [yum_requirements.txt](knowledge_base.md#yum-deps) file and add _mesa-libGL_.

<a id="mfaq-qt-load-xcb"></a>

<a id="how-can-i-fix-the-the-qt-platform-plugin-xcb-could-not-be-loaded-error-during-testing"></a>

## How can I fix the `The Qt platform plugin "xcb" could not be loaded` error during testing?

When testing packages that have a dependency on `pyqt`, the following error might occur under linux:

```shell-session
qt.qpa.plugin: Could not load the Qt platform plugin "xcb" in "" even though it was found.
This application failed to start because no Qt platform plugin could be initialized. Reinstalling the application may fix this problem.

Available platform plugins are: eglfs, minimal, minimalegl, offscreen, vnc, webgl, xcb.
```

This comes from the CI environment being headless and can be fixed by adding the `QT_QPA_PLATFORM=offscreen` [environment variable](https://docs.conda.io/projects/conda-build/en/stable/user-guide/environment-variables.html#inherited-environment-variables).
The variable can either be added directly to the test command or provided in the [meta.yaml](adding_pkgs.md#id4) like so:

```yaml
build:
  script_env:
    - QT_QPA_PLATFORM=offscreen
```

<a id="mfaq-contact-core"></a>

<a id="how-can-i-contact-conda-forge-core"></a>

## How can I contact conda-forge/core?

When in an issue or PR, you can contact [conda-forge/core](/community/governance/#teams-roles) by simply mentioning `@conda-forge/core` in a comment.
If you don't receive an an answer after a couple of days, feel free to reach out to us via the public [Element](https://app.element.io/#/room/#conda-forge:matrix.org) chatroom.

:::note

Due to a GitHub limitation, this is disabled for new members.
In that case, you can ping core using the bot command [@conda-forge-admin, please ping conda-forge/core](infrastructure.md#conda-forge-admin-please-ping-conda-forge).

:::

In case your issue is longer or you would like to contact us privately, feel free to reach out to us via the options listed at [Getting in Touch](/community/getting-in-touch/).

<a id="mfaq-abandoned-feedstock"></a>

<a id="a-feedstock-has-been-abandoned-and-i-would-like-to-take-over-maintenance"></a>

## A feedstock has been abandoned and I would like to take over maintenance.

A feedstock is generally considered abandoned when the maintainer isn't around anymore and doesn't merge new PRs or answer any issues.
If that is the case, you can add yourself to the team by using the [@conda-forge-admin, please add user @username](infrastructure.md#conda-forge-admin-please-add-user-username) command.
If the maintainer doesn't merge it after roughly a week, [contact conda-forge/core](#mfaq-contact-core) to have it merged.
Once added, you have full rights to the feedstock and can continue its maintenance.

:::note

Even if the maintainer isn't active anymore, we generally like to keep them in the list of maintainers and not remove them, in case they want to take up maintenance at a later date.

:::

<a id="mfaq-changes-to-major-projects"></a>

<a id="does-conda-forge-ever-make-significant-changes-or-apply-code-patches-to-significant-upstream-packages"></a>

## Does conda-forge ever make significant changes or apply code patches to significant upstream packages?

We generally try to avoid changes, but there are many notable exceptions and we have no set policy. These changes currently fall into
a few categories. Upstream projects that violate our community norms or pose significant security risks through their policies may
be changed so that they can be distributed on conda-forge. In many cases though, these projects are not distributed at all. We
do employ extensive changes to project build scripts in order to properly build and install projects into conda environments.
Finally, in some cases we add, enable, or disable features in specific projects to ensure they are broadly compatible with the
conda-forge package set. The set of patches/changes we apply is always located in the feedstock that built the package. We
also maintain a list of important packages with changes in our documentation.
