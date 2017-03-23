conda-smithy rerender
=====================

conda-forge  uses `conda-smithy` to re-render the feedstock and update the feedstock configuration.
This action updates the `README`, CI configuration, the build matrix,
fix problems with the feedstock configuration, etc.

The bot issues re-rendering PRs every now and then,
but sometimes the users may need to issue them manually instead waiting for the bot.
Here is how, and when, to re-render.

How to re-render?
-----------------

First make sure you have both:
    - both `defaults` and `conda-forge` channels in your `.condarc` and no other channel;
    - the `conda-forge` channel should be on **top** of `defaults` to ensure package consistency via channel preference;
    - updated version of `conda` and `conda-build`.

To ensure the channels are present and in the right order you can use:

```shell
conda config --add channels defaults --force
conda config --add channels conda-forge --force
```

You'll only need to run those commands once.
You can check if you have both channels with `conda info`.

The next step is to install `conda-smithy` in your root environment

```shell
conda install -c conda-forge conda-smithy
```

now, from the root directory of the feedstock, type:

```shell
conda smithy rerender
```

and commit the changes!

Note that you may get a warning message regarding the tokens.
It is safe to ignore that as they are not needed for re-rendering.

When should we re-render?
-------------------------

We need to re-render when there are changes the following parts of the feedstock:

- the `yum_requirements.txt`;
- the platform configuration (`skip` sections);
- build issues that a feedstock config update will fix (follow us on gitter to know about those);
- updates in the build matrix due to new versions of Python, NumPy, PERL, R, etc.
