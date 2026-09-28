"""Generates all PNG icons. Run: python3 tools/make_icons.py (needs Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "src" / "icons"
S = 1024  # supersampling canvas


def link_glyph(color, size=S, scale=1.0):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    c = size / 2
    w, h, stroke = 0.50 * size * scale, 0.28 * size * scale, 0.075 * size * scale
    off = 0.17 * size * scale
    for dx in (-off, off):
        box = (c + dx - w / 2, c - h / 2, c + dx + w / 2, c + h / 2)
        d.rounded_rectangle(box, radius=h / 2, outline=color, width=round(stroke))
    return img.rotate(45, resample=Image.BICUBIC)


def save(img, name, px):
    img.resize((px, px), Image.LANCZOS).save(OUT / name)


OUT.mkdir(exist_ok=True)
# Toolbar icons: dark glyph for light UI, light glyph for dark UI
for theme, color in (("light", (60, 64, 67, 255)), ("dark", (232, 234, 237, 255))):
    g = link_glyph(color, scale=1.15)
    for px in (16, 32):
        save(g, f"{theme}-{px}.png", px)

# Store / extensions page icon: 96px artwork inside 128px with padding
tile = Image.new("RGBA", (S, S), (0, 0, 0, 0))
pad = S * 16 // 128
ImageDraw.Draw(tile).rounded_rectangle((pad, pad, S - pad, S - pad), radius=S * 0.2, fill=(26, 115, 232, 255))
tile.alpha_composite(link_glyph((255, 255, 255, 255), scale=0.72))
for px in (16, 32, 48, 128):
    save(tile, f"icon-{px}.png", px)
print("ok")
