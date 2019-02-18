Avoid Dependencies Outside of Conda-Forge
-----------------------------------------

*Do all of my package's dependencies have to be in conda(-forge) already?*

Short answer: yes.

Long answer: In principle, as long as your dependencies are in at least one of
your user's conda channels they will be able to install your package. In practice,
that is difficult to manage, and we strive to have all dependencies built in conda-forge.

Building all of the dependencies in conda-forge allow us greater assurance
of ABI compatibility for the conda-forge packages.
**Only in extreme cases should you rely on a dependency outside of conda-forge.**
In these cases, the basic heirarchy for dependencies, in order of preference, is,

1. Make or use a conda-forge package for the dependency
2. Use a defaults package for a dependency
3. Use a `CDT <https://conda.io/docs/user-guide/tasks/build-packages/compiler-tools.html#cdt-packages>`_ for a dependency
4. Use a ``yum_requirements.txt`` for a dependency (deprecated)
5. Require the package to exist implicitly on the user's system outside of conda managing the package 
   in any way, shape, or form. This is obviously a terrible option and should never
   be purposefully used. The only exceptions are packages such as device drivers
   that **need** root or sys admin permissions and kernel access. For example, 
   GPU code usually requires that a graphics card driver be installed for the
   code to execute. Avoid these implicit dependencies at all costs.

If your dependencies do not change with the Python version, or with the
platform, consider making your build :ref:`noarch <noarch>`, this will
allow the recipe to build faster, and free some CI resources for other projects.
