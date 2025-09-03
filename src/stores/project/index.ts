import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Project {
  id: string;
  version: number;
  name: string;
  description?: string;
  maps: Array<{ id: string; name: string; description?: string; visible: boolean }>;
  activeMapId: string | null;
}

interface ProjectStoreState {
  current: Project | null;
  // Actions
  createEmpty: (params?: { name?: string; description?: string }) => Project;
  setActive: (project: Project | null) => void;
  rename: (name: string) => void;
  setDescription: (description: string) => void;
  // Map actions
  addMap: (params?: { name?: string; description?: string }) => string; // returns mapId
  selectMap: (id: string) => void;
  renameMap: (id: string, name: string) => void;
  setMapDescription: (id: string, description: string) => void;
  deleteMap: (id: string) => void;
  setMapVisibility: (id: string, visible: boolean) => void;
}

function uuid(): string {
  // Use crypto.randomUUID if available, fallback to simple random
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useProjectStore = create<ProjectStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        current: null,
        createEmpty: (params) => {
          const name = (params?.name ?? 'Untitled Campaign').trim() || 'Untitled Campaign';
          const description = params?.description?.trim();
          const project: Project = {
            id: uuid(),
            version: 1,
            name,
            description,
            maps: [],
            activeMapId: null,
          };
          set({ current: project });
          return project;
        },
        setActive: (project) => set({ current: project }),
        rename: (name) => {
          const cur = get().current;
          if (!cur) return;
          // Preserve spaces and live editing; don't trim on each keystroke
          set({ current: { ...cur, name } });
        },
        setDescription: (description) => {
          const cur = get().current;
          if (!cur) return;
          set({ current: { ...cur, description } });
        },
        addMap: (params) => {
          const cur = get().current;
          const name = params?.name ?? 'Untitled Map';
          const description = params?.description ?? '';
          if (!cur) {
            // Create a default campaign if none exists
            const project: Project = {
              id: uuid(),
              version: 1,
              name: 'Untitled Campaign',
              description: '',
              maps: [],
              activeMapId: null,
            };
            set({ current: project });
          }
          const next = get().current!;
          const id = uuid();
          const maps = [...next.maps, { id, name, description, visible: true }];
          set({ current: { ...next, maps, activeMapId: id } });
          return id;
        },
        selectMap: (id) => {
          const cur = get().current;
          if (!cur) return;
          if (!cur.maps.find((m) => m.id === id)) return;
          set({ current: { ...cur, activeMapId: id } });
        },
        renameMap: (id, name) => {
          const cur = get().current;
          if (!cur) return;
          set({
            current: {
              ...cur,
              maps: cur.maps.map((m) => (m.id === id ? { ...m, name } : m)),
            },
          });
        },
        setMapDescription: (id, description) => {
          const cur = get().current;
          if (!cur) return;
          set({
            current: {
              ...cur,
              maps: cur.maps.map((m) => (m.id === id ? { ...m, description } : m)),
            },
          });
        },
        deleteMap: (id) => {
          const cur = get().current;
          if (!cur) return;
          const maps = cur.maps.filter((m) => m.id !== id);
          const activeMapId = cur.activeMapId === id ? (maps[0]?.id ?? null) : cur.activeMapId;
          set({ current: { ...cur, maps, activeMapId } });
        },
        setMapVisibility: (id, visible) => {
          const cur = get().current;
          if (!cur) return;
          set({
            current: {
              ...cur,
              maps: cur.maps.map((m) => (m.id === id ? { ...m, visible } : m)),
            },
          });
        },
      }),
      {
        name: 'map-territory-project',
        partialize: (state) => ({ current: state.current }),
      }
    )
  )
);
