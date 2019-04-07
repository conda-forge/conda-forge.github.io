.. conda-forge documentation master file, created by
   sphinx-quickstart on Wed Jun  1 01:44:13 2016.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

A brief introduction
====================

What is conda-forge?
--------------------

conda-forge is a community effort that provides conda packages for a wide range of software.

**Missing a package that you would love to install with conda?** - Chances are we already packaged it for you!

You can `search <https://anaconda.org/>`__ for packages online. Look out for packages provided  by our ``conda-forge`` organization.

**Cannot find a package or only outdated versions of a package?** - Everybody is welcome to contribute to our package stack! Please refer to :ref:`becoming_involved`, for an overview over how to start contributing.


Why conda-forge?
----------------

The conda team from Anaconda, Inc packages a multitude of packages and provides them to all users free of charge in their ``default`` channel.

But what if a package you are looking for is not in the default channel?
In the past users only had the option to create an `anaconda cloud <https://anaconda.org/>`__ account and create their own channel.

This came with a list of disadvantages:

 - locating packages was difficult due them being scattered over many channels.
 - combining packages across channels was not always possible due to binary incompatibilities.
 - packages were only available for architectures the developer was interested in or had access to. 
 - channels were often abandoned, updating required locating new channels

conda-forge is a community effort that tackles these issues:

 - all packages are shared in a single channel named ``conda-forge``
 - care is taken that all packages are up-to-date
 - common standards ensure that all packages have compatible versions
 - by default we build packages for macOS, linux amd64 and windows amd64
 - many packages are updated by multiple maintainers with an easy option to become a maintainer
 - an active core developer team is trying to also maintain abandoned packages



How can I install packages from conda-forge?
--------------------------------------------

Using conda-forge is as easy! You just have to register the conda-forge channel as a package source for conda,
and activate the ``strict`` channel priority (strict will be activated by default in conda 4.7).

.. code-block:: bash

  conda config --add channels conda-forge
  conda config --set channel_priority strict


From now on using ``conda install <package-name>`` will also find packages in our conda-forge channels.


.. note::

  Please be aware that the order of your conda package channels is important, especially when you combine conda-forge with other channels, e.g. ``bioconda``.
  
  Please refer to :ref:`multiple_channels` for pitfalls and more information.

Announcements
=============

Pinned Announcements
--------------------

:2018‑09‑24:  Deprecation notice for Python 3.5

    As we start building out more of the python 3.7 stack, we will no longer be building
    python 3.5 packages.

    No new python 3.5 packages will be built after 2018-10-01.

:2019‑01‑22: It has happened! Conda-forge has migrated to the latest compilers 🎉.

    If you:
      * maintain a compiled feedstock, it will likely need to be rerender
      * need to roll back to the old compilers, you can use the "cf201901" label

Announcements
-------------

:2018‑10‑12: The rebuild is moving along nicely with almost a third of packages completed.

    Recently completed are numpy and openblas which should open up much of the python numeric stack.
    We're only about 5 feedstocks away from opening up all of R as well.

:2018‑09‑24: A minimal python 3.7 build is now available across all platforms and both compilers!

:2018‑09‑20:  The compiler migration is in full swing.  The bot will be making the rounds and
    modernizing more than 4000 packages.  This is going to take a few months to get done so
    bear with us.

:2018‑09‑10: Conda forge now has a magical status bar for tracking the progress of migrations.

    You can find this at `conda-forge.org/status <https://conda-forge.org/status>`_.
