import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '@/stores/project';

describe('Project Store (Campaign)', () => {
  beforeEach(() => {
    // reset
    useProjectStore.setState({ current: null });
  });

  it('creates an empty campaign with defaults', () => {
    const project = useProjectStore.getState().createEmpty({ name: 'Untitled Campaign', description: '' });
    expect(project.name).toBe('Untitled Campaign');
    expect(project.description).toBe('');
    expect(project.maps).toEqual([]);
    expect(project.activeMapId).toBeNull();
  });

  it('allows spaces in campaign name during rename', () => {
    useProjectStore.getState().createEmpty({ name: 'A', description: '' });
    useProjectStore.getState().rename('My Campaign Title');
    expect(useProjectStore.getState().current?.name).toBe('My Campaign Title');
  });

  it('updates description', () => {
    useProjectStore.getState().createEmpty({ name: 'X', description: '' });
    useProjectStore.getState().setDescription('Hello world');
    expect(useProjectStore.getState().current?.description).toBe('Hello world');
  });
});

