# Fixed Maintenance Process for Feedstock Teams

We have fixed a bug where the maintainers of feedstocks listed in the
`meta.yaml` did not match those listed in the GitHub team. Due to this
change, you may notice emails from GitHub informing you that you have
been removed from a GitHub team if you have recently removed yourself
from a feedstock via changing the `meta.yaml`. A similar fix has been
applied for maintenance teams as well, though you will not see emails
from this fix.
