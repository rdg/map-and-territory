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

export const PaperType = {
  id: 'paper',
  title: 'Paper',
  defaultState: { color: '#ffffff' },
  adapter: PaperAdapter,
  policy: { canDelete: false, canDuplicate: false, maxInstances: 1 },
} as const;
