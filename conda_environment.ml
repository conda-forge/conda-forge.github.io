conda env create -f ./.ci_scripts/environment.yml
conda activate conda-forge-docs
cd newsfeed && pip install --no-deps .
cd ../src
make html
