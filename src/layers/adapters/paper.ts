import type { LayerAdapter } from '@/layers/types';

export interface PaperState {
  color: string; // hex
}

export const PaperAdapter: LayerAdapter<PaperState> = {
  title: 'Paper',
  drawMain(ctx, state, env) {
    const { w, h } = env.size;
    ctx.save();
    ctx.fillStyle = state.color || '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  },
};

