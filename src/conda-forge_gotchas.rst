conda-forge 'gotchas'
=====================

Using multiple channels
-----------------------

It is quite common to install a package from conda-forge and,
when trying to use it,
see an error like (OS X example):

.. code-block:: shell

    ImportError: dlopen(.../site-packages/rpy2/rinterface/_rinterface.so, 2): Library not loaded: @rpath/libicuuc.54.dylib
      Referenced from: .../site-packages/rpy2/rinterface/_rinterface.so
      Reason: image not found

That happens because either the correct version of `icu`,
or any other package in the error,
is not present or the package is missing altogether.

Once can confirm by issuing the command ``conda list`` and searching for the package in question.

Why that happens?
'''''''''''''''''

The `conda-forge` and `defaults` are not 100% compatible.
In the example above it is known that `defaults` uses `icu 54.*` while `conda-forge` relies on `icu 56.*`,
that mismatch can lead to errors when the install environment is mixing packages from multiple channels.

Note: All of conda-forge software pinning can be found at: https://github.com/conda-forge/staged-recipes/wiki/Pinned-dependencies

How to fix it?
''''''''''''''

Newer `conda` versions introduced a channel priority feature.
See https://conda.io/docs/channels.html for more information.

One possible solution is to add the `conda-forge` channel on top of `defaults` in your `condarc` file when using `conda-forge` packages.
This will ensuring that all the dependencies will come from the `conda-forge` channel.
Here is how a `.condarc` file would look like:

.. code-block:: shell

    $ cat .condarc
    channels:
      - conda-forge
      - defaults

In addition to the channel priority we recommend to always install your packages inside a new environment instead the root environment from anaconda/miniconda.
Using envs make it easier to debug problems with packages and ensure the stability of your root env.
