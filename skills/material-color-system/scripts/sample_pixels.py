#!/usr/bin/env python3
"""Sample an image to ARGB ints for MCU QuantizerCelebi. Downscales first: quantization wants
representative pixels, not megapixels. Usage: sample_pixels.py <image> -> JSON list of ARGB ints."""
import json, sys
from PIL import Image

im = Image.open(sys.argv[1]).convert("RGBA")
im.thumbnail((256, 256))
pixels = []
for r, g, b, a in im.getdata():
    if a < 125:
        continue
    pixels.append((255 << 24) | (r << 16) | (g << 8) | b)
print(json.dumps(pixels))
