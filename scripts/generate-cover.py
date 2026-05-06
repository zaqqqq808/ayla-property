#!/usr/bin/env python3
"""
AYLA Property - Blog Cover Image Generator
==========================================
Generates a 1600x865 JPEG cover image for journal posts.

Usage:
    python3 scripts/generate-cover.py

Edit the CONFIG section below to change the title, category tag, and output
filename, then run the script. The image is saved directly into
public/images/journal/ ready to reference in your .md frontmatter.

Requirements:
    pip install Pillow

Category tag examples:
    INVESTMENT GUIDE
    LEGAL GUIDE
    CASE STUDY
    MARKET REPORT
    AREA SPOTLIGHT
    STRATEGY
"""

# ============================================================
# CONFIG - edit these for each new article
# ============================================================

TITLE_LINE_1 = 'Best Areas to'
TITLE_LINE_2 = 'Invest in Bali 2026'
CATEGORY_TAG = 'INVESTMENT GUIDE'
OUTPUT_FILE  = 'best-areas-bali-2026.jpg'

# ============================================================

import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1600, 865

def find_font(mac_name, linux_path):
    mac = f'/System/Library/Fonts/Supplemental/{mac_name}'
    if os.path.exists(mac):
        return mac
    if os.path.exists(linux_path):
        return linux_path
    raise FileNotFoundError(f'Font not found: {mac_name}')

LATO_BLACK = find_font('Lato-Black.ttf',   '/usr/share/fonts/truetype/lato/Lato-Black.ttf')
LATO_BOLD  = find_font('Lato-Bold.ttf',    '/usr/share/fonts/truetype/lato/Lato-Bold.ttf')
LATO_REG   = find_font('Lato-Regular.ttf', '/usr/share/fonts/truetype/lato/Lato-Regular.ttf')

# Gradient: deep jungle green -> warm terracotta
TOP_L = (22,  88,  60)
BOT_R = (160, 60,  30)
GOLD  = (212, 175, 100)

def lerp_c(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def make_cover(title_l1, title_l2, category, out_path):
    img = Image.new('RGB', (W, H))
    px  = img.load()

    for y in range(H):
        for x in range(W):
            px[x, y] = lerp_c(TOP_L, BOT_R, x / W * 0.5 + y / H * 0.5)

    draw = ImageDraw.Draw(img)

    draw.rectangle([0, 0, W, 8], fill=GOLD)

    f_cat   = ImageFont.truetype(LATO_BOLD,  26)
    f_big   = ImageFont.truetype(LATO_BLACK, 130)
    f_big2  = ImageFont.truetype(LATO_BLACK, 110)
    f_brand = ImageFont.truetype(LATO_BOLD,  24)
    f_url   = ImageFont.truetype(LATO_REG,   22)
    f_yr    = ImageFont.truetype(LATO_BOLD,  28)

    cx, cy = 80, 52
    cw = int(draw.textlength(category, font=f_cat)) + 40
    draw.rectangle([cx, cy, cx + cw, cy + 44], fill=GOLD)
    draw.text((cx + 20, cy + 9), category, font=f_cat, fill=(30, 20, 10))

    ty = 190
    draw.text((80, ty),       title_l1, font=f_big,  fill=(255, 255, 255))
    draw.text((80, ty + 140), title_l2, font=f_big2, fill=(255, 255, 230))

    rw = max(
        int(draw.textlength(title_l1, font=f_big)),
        int(draw.textlength(title_l2, font=f_big2)),
    )
    draw.rectangle([80, ty + 265, 80 + rw, ty + 273], fill=GOLD)

    draw.text((80, H - 54), 'AYLA PROPERTY',    font=f_brand, fill=(255, 255, 255))
    draw.text((80, H - 26), 'aylaproperty.com', font=f_url,   fill=GOLD)

    yr_w = int(draw.textlength('2026', font=f_yr))
    draw.text((W - 80 - yr_w, H - 50), '2026', font=f_yr, fill=(255, 255, 255))

    img.save(out_path, 'JPEG', quality=94)
    print(f'Saved: {out_path}')

script_dir = os.path.dirname(os.path.abspath(__file__))
out = os.path.normpath(os.path.join(script_dir, '..', 'public', 'images', 'journal', OUTPUT_FILE))
make_cover(TITLE_LINE_1, TITLE_LINE_2, CATEGORY_TAG, out)
