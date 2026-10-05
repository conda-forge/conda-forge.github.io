# New Admin Webservices Command to Convert Recipes to v1

We have added a new admin webservices command to convert recipes to the v1 format. You can
use this command, `@conda-forge-admin, please convert to v1` in the title of an issue to
open a new PR or in a comment on a PR to push to an existing one. The conversion process is
done by [conda-recipe-manager](https://github.com/conda/conda-recipe-manager), and any errors
in the conversion process will be posted as a comment to the PR.
