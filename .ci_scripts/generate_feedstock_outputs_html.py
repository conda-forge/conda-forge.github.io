import os
import sys
import glob

import tqdm
import jinja2
import rapidjson as json

input_file = sys.argv[1]
output_file = sys.argv[2]
feedstocks_repo = sys.argv[3]

with open(input_file) as fp:
    tmpl = jinja2.Template(fp.read())

outputs = glob.glob(
    os.path.join(feedstocks_repo, "outputs", "**/*.json"),
    recursive=True,
)

packages = {}
for output in tqdm.tqdm(outputs):
    key = os.path.basename(output).replace(".json", "")
    with open(output, "r") as fp:
        packages[key] = json.load(fp)

with open(output_file, "w") as fp:
    fp.write(tmpl.render({"packages": packages}))
