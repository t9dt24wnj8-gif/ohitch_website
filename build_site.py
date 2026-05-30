#!/usr/bin/env python3
"""
Small deterministic site builder (rebuilds `site/` from `reference_material/`).
This is provided as a convenience. It uses only the Python standard library.

Usage: python3 build_site.py
"""
import os, shutil, re, json

ROOT = os.path.dirname(__file__)
SRC = os.path.join(ROOT, 'reference_material')
OUT = os.path.join(ROOT, 'site')

def safe_slug(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", '-', s).strip('-')
    return s or 'page'

def ensure(path):
    os.makedirs(path, exist_ok=True)

def copy_images():
    ensure(os.path.join(OUT, 'assets', 'images'))
    for root, _, files in os.walk(SRC):
        for f in files:
            if f.lower().endswith(('.png','.jpg','.jpeg','.gif')):
                src = os.path.join(root, f)
                dst = os.path.join(OUT, 'assets','images', f)
                shutil.copy2(src, dst)

def main():
    print('This repository already contains a pre-built static site at ./site/.')
    print('If you still have `reference_material/` present, this script can copy images into site/assets/images.')
    if os.path.isdir(SRC):
        copy_images()
        print('Copied images from reference_material into site/assets/images')
    else:
        print('No reference_material/ folder found in repository root.')

if __name__ == '__main__':
    main()
