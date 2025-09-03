import type { LayerAdapter } from '@/layers/types';

export interface HexgridState {
  size: number; // hex radius in px
  rotation: number; // radians
  color: string; // stroke color
  alpha?: number;
}

function drawHexGrid(ctx: CanvasRenderingContext2D, w: number, h: number, size: number, rotation: number, color: string, alpha = 0.2) {
  // Basic pointy-top hex math
  const r = size;
  const hexH = Math.sin(Math.PI / 3) * r * 2; // height of hex
  const hexW = r * 1.5 * 2; // horizontal pitch (col advance)
  const vx = r * 1.5; // x step
  const vy = hexH / 2; // y offset per column

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.translate(w / 2, h / 2);
  ctx.rotate(rotation);
  ctx.translate(-w / 2, -h / 2);

  const cols = Math.ceil(w / vx) + 2;
  const rows = Math.ceil(h / (hexH)) + 2;

  const drawHexAt = (x: number, y: number) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + i * (Math.PI / 3);
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  };

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const x = col * vx + (row % 2 === 0 ? 0 : vx / 2);
      const y = row * vy * 2 + (col % 2 === 0 ? 0 : vy);
      drawHexAt(x, y);
    }
  }

  ctx.restore();
}

export const HexgridAdapter: LayerAdapter<HexgridState> = {
  title: 'Hex Grid',
  drawMain(ctx, state, env) {
    const { w, h } = env.size;
    const { size, rotation, color, alpha } = state;
    drawHexGrid(ctx, w, h, Math.max(6, size || 24), rotation || 0, color || '#000000', alpha ?? 0.2);
  },
};

