import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Project {
  id: string;
  version: number;
  name: string;
  description?: string;
  maps: Array<{ id: string; name: string }>; // placeholder until maps implemented
  activeMapId: string | null;
}

interface ProjectStoreState {
  current: Project | null;
  // Actions
  createEmpty: (params?: { name?: string; description?: string }) => Project;
  setActive: (project: Project | null) => void;
  rename: (name: string) => void;
  setDescription: (description: string) => void;
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
      }),
      {
        name: 'map-territory-project',
        partialize: (state) => ({ current: state.current }),
      }
    )
  )
);
