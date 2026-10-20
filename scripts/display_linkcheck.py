import argparse
import json
from collections import defaultdict
from termcolor import colored

status_colors = dict(
    broken='red',
    redirected='yellow',
    working='green',
    ignored='white',
    unchecked='white',
 )

def create_parser():
    parser = argparse.ArgumentParser('display_linkcheck')
    parser.add_argument('linkcheck_json')
    return parser


def main():
    parser = create_parser()
    args = parser.parse_args()
    buffer = defaultdict(list)
    with open(args.linkcheck_json) as fh:
        for line in fh:
            data = json.loads(line)
            buffer[data['status']].append(data)
   
    for status, color in status_colors.items():
        if status not in buffer:
            continue
        for data in buffer[status]:
            
            print_tokens = [
                colored(f'[{data["status"]}]', color),
                colored(data['uri'], 'magenta'),
                f'{data["filename"]}:{data["lineno"]}',
            ]
            if data['info'] != '':
                print_tokens.append(f'({data["info"]})')

            print(*print_tokens)

if __name__ == '__main__':
    main()