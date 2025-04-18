#!/usr/bin/env python

import sys

for path in sys.argv[1:]:
    with open(path) as f:
        header = next(f)
        rows = sorted(f, key=str.lower)
    with open(path, "w") as f:
        f.write("".join([header, *rows]))
