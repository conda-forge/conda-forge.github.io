# Default branch migration from ``master`` to ``main``

We will be migrating the default branches of all feedstocks and other
conda-forge repos from `master` to `main`. We do expect some minor
hiccups while this migration is going on. You will need to change to the
`main` branch from `master` on any local clones via the following git
commands:

``` 
git branch -m master main 
git fetch origin 
git branch -u origin/main main 
git remote set-head origin -a
```

If you encounter any problems, please comment on this Github
[issue](https://github.com/conda-forge/conda-forge.github.io/issues/1162).
