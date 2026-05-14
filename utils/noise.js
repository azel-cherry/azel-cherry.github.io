import { createNoise3D } from 'https://cdn.skypack.dev/simplex-noise';


const canvas = document.getElementById('bg-noise');
const ctx = canvas.getContext('2d');
const noise3D = createNoise3D();

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

const style = getComputedStyle(document.documentElement);
const colors = [
  hexToRgb(style.getPropertyValue('--noise1').trim()),
  hexToRgb(style.getPropertyValue('--noise2').trim()),
  hexToRgb(style.getPropertyValue('--noise3').trim()),
];

const SCALE = 30;  // higher = bigger blobs
const SPEED = 0.0003; // higher = faster
const RESOLUTION = 0.1;

function getColor(value) {
  // value is -1 to 1, map to 0 to (colors.length-1)
  const t = (value + 1) / 2 * (colors.length - 1);
  const i = Math.floor(t);
  const f = t - i;
  const a = colors[Math.min(i, colors.length - 1)];
  const b = colors[Math.min(i + 1, colors.length - 1)];
  return [
    a[0] + (b[0] - a[0]) * f,
    a[1] + (b[1] - a[1]) * f,
    a[2] + (b[2] - a[2]) * f,
  ];
}

function draw(t) {
  canvas.width = window.innerWidth * RESOLUTION;
  canvas.height = window.innerHeight * RESOLUTION;
  const imageData = ctx.createImageData(canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const value = noise3D(x / SCALE, y / SCALE, t);
      const [r, g, b] = getColor(value);
      const i = (y * canvas.width + x) * 4;
      imageData.data[i]     = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(t => draw(t * SPEED));
}

requestAnimationFrame(t => draw(t * SPEED));