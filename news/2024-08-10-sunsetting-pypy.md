# Sunsetting PyPy support

Conda-forge introduced [support](https://conda-forge.org/blog/2020/03/10/pypy/)
for [PyPy](https://pypy.org/index.html) as an alternative implementation of
Python about 4.5 years ago.

In that time we have worked hard together with developers from PyPy to provide
easily installable pre-compiled builds of the most common libraries also for PyPy.

As a very positive side-effect, the infrastructure of conda-forge is now fully
equipped to deal with alternative implementations of the Python interpreter,
which will continue to be useful (for example for supporting the experimental
free-threading builds of CPython 3.13).

However, due to a lack of resources – both in terms of expertise for PyPy, as
well as available time of those who can help – the conda-forge builds for PyPy
packages have been in minimal maintenance for a while (for example, we never
migrated for PyPy 3.10, nor did PyPy participate in the NumPy 2.0 migration).

As a consequence, we unfortunately need to announce that we are sunsetting
support for PyPy. This means we will stop the long-running migrator to add
PyPy to new feedstocks, and we will begin removing PyPy builds from feedstocks
at the latest on October 1st, or when we begin migrating for CPython 3.13
(whichever comes earlier).

If you are depending on PyPy builds in some way, please let us know about the
specifics of your situation in the discussion issue for the
[RFC](https://github.com/conda-forge/conda-forge.github.io/issues/2255).

There is a possibility that we receive the necessary support from the PyPy
developers, if it turns out that enough people depend on PyPy support in
conda-forge for it to be worth their time. As such, please speak up if you
fall into this category!

Finally, no matter the outcome, we want to congratulate the PyPy developers
for their important contributions and exploration of what is possible in the
Python ecosystem! 👏

It has been a pleasure to collaborate!
