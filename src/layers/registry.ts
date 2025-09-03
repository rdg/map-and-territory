import type { LayerType, LayerTypeId } from './types';

const layerTypes = new Map<LayerTypeId, LayerType<any>>();

export function registerLayerType<T>(def: LayerType<T>) {
  layerTypes.set(def.id, def as LayerType<any>);
}

export function unregisterLayerType(id: LayerTypeId) {
  layerTypes.delete(id);
}

export function getLayerType<T = unknown>(id: LayerTypeId): LayerType<T> | undefined {
  return layerTypes.get(id) as LayerType<T> | undefined;
}

export function listLayerTypes(): LayerType[] {
  return Array.from(layerTypes.values());
}

