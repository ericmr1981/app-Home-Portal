#!/usr/bin/env python3
# Script to fix Chinese quotation marks in planets.json

import sys

def fix_quotes_in_json(filename):
    with open(filename, 'rb') as f:
        content_bytes = f.read()

    # Replace left double quotation mark (U+201C) with regular quote
    content_bytes = content_bytes.replace(b'\xe2\x80\x9c', b'"')
    # Replace right double quotation mark (U+201D) with regular quote
    content_bytes = content_bytes.replace(b'\xe2\x80\x9d', b'"')

    with open(filename, 'wb') as f:
        f.write(content_bytes)

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <filename>")
        sys.exit(1)

    filename = sys.argv[1]
    fix_quotes_in_json(filename)
    print(f"Fixed quotes in {filename}")