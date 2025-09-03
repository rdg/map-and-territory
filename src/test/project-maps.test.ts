import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '@/stores/project';

describe('Project Store Maps', () => {
  beforeEach(() => {
    useProjectStore.setState({ current: null });
  });

  it('adds and selects a new map', () => {
    useProjectStore.getState().createEmpty({ name: 'Camp', description: '' });
    const id = useProjectStore.getState().addMap({ name: 'Map 1', description: '' });
    expect(useProjectStore.getState().current?.maps.length).toBe(1);
    expect(useProjectStore.getState().current?.activeMapId).toBe(id);
  });

  it('renames and deletes a map', () => {
    useProjectStore.getState().createEmpty({ name: 'Camp', description: '' });
    const id = useProjectStore.getState().addMap({ name: 'Old', description: '' });
    useProjectStore.getState().renameMap(id, 'New Name');
    expect(useProjectStore.getState().current?.maps[0].name).toBe('New Name');
    useProjectStore.getState().deleteMap(id);
    expect(useProjectStore.getState().current?.maps.length).toBe(0);
  });

  it('toggles map visibility', () => {
    useProjectStore.getState().createEmpty({ name: 'Camp', description: '' });
    const id = useProjectStore.getState().addMap({ name: 'Visible Map', description: '' });
    expect(useProjectStore.getState().current?.maps[0].visible).toBe(true);
    useProjectStore.getState().setMapVisibility(id, false);
    expect(useProjectStore.getState().current?.maps[0].visible).toBe(false);
  });
});
