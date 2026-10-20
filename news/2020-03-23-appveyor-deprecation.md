# Appveyor Deprecation

We are now starting to formally deprecate Appveyor in favor of Azure for
builds on the `win` platform. Note that we have not been adding appveyor
to new feedstocks for a while, so this is not a completely new change in
policy. We will now, however, begin to actively disable Appveyor builds
on feedstocks not using it by turning off builds for GitHub `push`
events. Additionally, we have been issuing PRs to any remaining
feedstocks to move them to Azure. We are aware that some packages built
with `msbuild` cannot yet be moved to Azure and so are leaving Appveyor
on for those feedstocks for now.
