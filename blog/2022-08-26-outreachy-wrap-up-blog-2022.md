---
authors:
  - name: Surbhi Sharma
    title: Outreachy intern
    url: https://github.com/ssurbhi560
    image_url: https://github.com/ssurbhi560.png
tags: [Outreachy]
---

# Outreachy 2022 Wrap-up Blog

This blog is about my work during my Outreachy internship with
[conda-forge](https://conda-forge.github.io). Before that a little about
me - I am [Surbhi](https://github.com/ssurbhi560), an Outreachy intern
with conda-forge for the May-August 2022 cohort and I worked on
documenting the conda-forge ecosystem.

<!--truncate-->

The first issue I started working on when the internship began was
[Better anchoring of
announcements(#1611)](https://github.com/conda-forge/conda-forge.github.io/issues/1611).
The goal of this issue was to fix the anchor for each year and also
specific announcements in the Announcements section so as to provide
better navigation of the [Announcements
page](https://conda-forge.org/docs/user/announcements.html). This was
also the time when I was feeling quite overwhelmed and anxious since I
was just starting and was unsure if I would be able to give my best. But
thanks to my awesome mentors
[@Katherine](https://github.com/kathatherine) and
[@Matt](https://github.com/beckermr), who have always been so helpful,
I was able to have a good start. We solved this issue in two parts. The
first part was to add anchors to each year which is solved with [Improve
anchors for each year in the Announcements section.
(#1766)](https://github.com/conda-forge/conda-forge.github.io/pull/1766),
and the second part was adding anchors to each announcement and fixing
the RSS feed.

The part of the documentation I focused on after completing the first
issue was [Maintainers'
Documentation](https://conda-forge.org/docs/maintainer/00_intro.html).
Many open issues needed to be taken care of to make the Maintainers'
documentation more useful and accessible for new maintainers. The open
tickets that we have worked on are:

1.  [Document extras feedstock-name
    (#1769)](https://github.com/conda-forge/conda-forge.github.io/issues/1769)
    and [Explain how to become a maintainer
    (#1331)](https://github.com/conda-forge/conda-forge.github.io/issues/1331).
    Closed with [add extra section-recipe maintainer and feedstock-name
    (#1772)](https://github.com/conda-forge/conda-forge.github.io/pull/1772).

    > As we started with improving the Maintainer documentation, these
    > were the issues we picked first to work on. The first issue was
    > documenting how maintainers can use the "feedstock-name" directive
    > for naming feedstocks differently than their package names in
    > staged recipes. The second issue was documenting how one should
    > become a package maintainer.

2.  [Add more steps in Improve the documentation section
    (#1651)](https://github.com/conda-forge/conda-forge.github.io/issues/1651).
    Closed with [Update "Improve the documentation" section with more
    steps
    (#1776)](https://github.com/conda-forge/conda-forge.github.io/pull/1776).

    > In this issue we added some additional steps for people who would
    > like to start contributing to conda-forge, especially to
    > documentation.

3.  [Add more information about Grayskull in the documentation itself
    (#1655)](https://github.com/conda-forge/conda-forge.github.io/issues/1655).
    Closed with
    [#1777](https://github.com/conda-forge/conda-forge.github.io/pull/1777).

    > The documentation on Grayskull in docs lacked the answers to
    > questions like what exactly Grayskull is and how one should use
    > Grayskull to generate a recipe. With this issue, we added more
    > documentation on Grayskull for users.

4.  [Clarify feedstock LICENSE.txt
    (#803)](https://github.com/conda-forge/conda-forge.github.io/issues/803).
    Closed with [Add Feedstock repository structure section
    (#1786)](https://github.com/conda-forge/conda-forge.github.io/pull/1786).

    > The docs for contributing and maintaining conda recipes discuss
    > when and how to distribute the license for a particular package.
    > The auto-generated feedstock repositories also include a license
    > in the root, which is different from the related package license.
    > With this issue, we added documentation on the differences between
    > those two licenses and briefly explained the feedstock repository
    > structure.

5.  [DOC: New maintainer
    (#1117)](https://github.com/conda-forge/conda-forge.github.io/issues/1117).
    Closed with [Add "How regro-cf-autotick-bot create version update
    PR?" section.
    (#1788)](https://github.com/conda-forge/conda-forge.github.io/pull/1788).

    > With this issue we improved docs for the new maintainers and the
    > working of the bot. A "How does `regro-cf-autotick-bot` create
    > automatic version updates?" section was added to the docs, which
    > explains the whole process of creating an automated version update
    > PRs by bot.

6.  [Add Perl package hints to documentation
    (#1536)](https://github.com/conda-forge/conda-forge.github.io/issues/1536).
    Working on this
    [#1790](https://github.com/conda-forge/conda-forge.github.io/pull/1790).

    > With this issue we added ​​packaging instructions for Perl packages
    > with different build systems in the documentation.

7.  [DOC: Update documentation about tokens
    (#1532)](https://github.com/conda-forge/conda-forge.github.io/issues/1532).
    Closed with
    [#1793](https://github.com/conda-forge/conda-forge.github.io/pull/1793).

    > Feedstocks have stopped storing encrypted tokens to upload
    > packages, but outdated information on tokens was still present in
    > the documentation. With this issue we removed the outdated
    > information and also added a new section "How to update your
    > feedstock token?" for maintainers.

8.  [Improve the documentation on arch_rebuild.txt
    (#1668)](https://github.com/conda-forge/conda-forge.github.io/issues/1668).
    Closed with
    [#1794](https://github.com/conda-forge/conda-forge.github.io/pull/1794).

    > With this issue we improved the documentation on
    > `arch_rebuild.txt` and how maintainers can add a feedstock to
    > `arch-rebuild.txt` if it requires rebuilding with different
    > architectures/platforms (such as ppc64le or aarch64).

9.  [Document migrators
    (#1355)](https://github.com/conda-forge/conda-forge.github.io/issues/1355),
    [Update migration docs
    (#862)](https://github.com/conda-forge/conda-forge.github.io/issues/862),
    and [document migrators
    (#737)](https://github.com/conda-forge/conda-forge.github.io/issues/737)
    . Closed with [Documenting Migrators and Migrations.
    (#1801)](https://github.com/conda-forge/conda-forge.github.io/pull/1801).

    > With these, we added more documentation on migrations and
    > migrators, which would help maintainers find answers to questions
    > like - What is a migrator/migration, and what does it do? When can
    > (and why would) they should reject a migration PR? And so on.

10. [Add a section in docs on security aspects of conda-forge
    (#1808)](https://github.com/conda-forge/conda-forge.github.io/issues/1808).
    Closed with
    [#1812](https://github.com/conda-forge/conda-forge.github.io/pull/1812).

    > Currently, information regarding the security considerations of
    > conda-forge builds is scattered throughout the documentation, and
    > therefore it is hard to find and read. With this issue, we will
    > put all the information together in one place, which will help
    > maintainers and users to know more about how conda-forge secures
    > its packages and infrastructure.

I met some wonderful people during the internship who helped me with all
my questions and doubts that I had. The experience during the internship
also helped me get better opportunities after completing the Outreachy
internship. I have learned so many things during the internship that it
would make a long list if I were to write all of those. But the most
important things I learned are:

- The importance of documentation and how to write good documentation.
- The best practices to follow while writing documentation.
- More about conda-forge and packaging tools.

And above all, Outreachy helped me feel more confident about my skills
and overcome the imposter syndrome I had before. Thanks again to my
awesome mentors and the kind people of the conda-forge community! :)
