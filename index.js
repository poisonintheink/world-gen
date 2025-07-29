const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

function hash(seed, x, y) {
  let h = seed ^ (x * 374761393) ^ (y * 668265263);
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

function random(seed, x, y) {
  return hash(seed, x, y) / 0xffffffff;
}

function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

function noise2D(seed, x, y, scale) {
  const sx = x / scale;
  const sy = y / scale;
  const x0 = Math.floor(sx);
  const y0 = Math.floor(sy);
  const x1 = x0 + 1;
  const y1 = y0 + 1;
  const dx = sx - x0;
  const dy = sy - y0;

  const n00 = random(seed, x0, y0);
  const n10 = random(seed, x1, y0);
  const n01 = random(seed, x0, y1);
  const n11 = random(seed, x1, y1);

  const ix0 = lerp(n00, n10, dx);
  const ix1 = lerp(n01, n11, dx);
  return lerp(ix0, ix1, dy);
}

function generateHeightMap(width, height, seed, scale = 16) {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(noise2D(seed, x, y, scale));
    }
    grid.push(row);
  }
  return grid;
}

function printGrid(grid) {
  const chars = ' .:-=+*#%@';
  for (const row of grid) {
    const line = row
      .map(v => chars[Math.floor(v * (chars.length - 1))])
      .join('');
    console.log(line);
  }
}

function saveGrid(filePath, grid) {
  fs.writeFileSync(filePath, JSON.stringify({ grid }, null, 2));
}

function loadGrid(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return data.grid;
}

function main() {
  const args = process.argv.slice(2);
  const loadIndex = args.indexOf('--load');
  if (loadIndex !== -1) {
    const file = args[loadIndex + 1];
    const grid = loadGrid(file);
    printGrid(grid);
    return;
  }

  const world = parseYaml(path.join(__dirname, 'config', 'world.yaml')).world;
  const palettePath = path.join(__dirname, world.biome_palette);
  const palette = parseYaml(palettePath);
  const widthArg = args.indexOf('--width');
  const heightArg = args.indexOf('--height');
  const outIndex = args.indexOf('--output');
  const width = widthArg !== -1 ? parseInt(args[widthArg + 1], 10) : world.grid_size.width;
  const height = heightArg !== -1 ? parseInt(args[heightArg + 1], 10) : world.grid_size.height;
  const grid = generateHeightMap(width, height, world.seed);
  printGrid(grid);
  if (outIndex !== -1) {
    const outFile = args[outIndex + 1];
    saveGrid(outFile, grid);
  }
}

main();