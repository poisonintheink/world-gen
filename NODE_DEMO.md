
# Node.js Demo

This repository now includes a minimal Node.js script to generate a simple height map.

## Setup

1. Install Node.js (tested with v20).
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Generate a height map using the settings in `config/world.yaml`:

```bash
npm run generate -- --width 50 --height 25 --output heightmap.json
```

The script prints an ASCII preview of the generated map. Use `--width` and `--height` to override the size. To load a previously saved grid:

```bash
npm run generate -- --load heightmap.json
```

The biome palette is read from `palettes/biome_palette.yaml` as referenced by the world config.