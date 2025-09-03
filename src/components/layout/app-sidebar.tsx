
'use client';

/**
 * AppSidebar - Scene View Panel for Hexmap Editor
 * 
 * Simple scene organization panel for managing maps and layers.
 * Replaces enterprise navigation with creative tool workflow.
 */

import React from 'react';

// Render custom lightweight sidebar to work inside PanelGroup without fixed positioning
import { Separator } from '@/components/ui/separator';

import { useLayoutStore } from '@/stores/layout';
import { AppSidebarProps } from '@/types/layout';

// Icons for creative tools
import {
  Map,
  Layers,
  Plus,
  MoreHorizontal,
} from 'lucide-react';

// ============================================================================
// Mock Data - Scene Structure
// ============================================================================

const MOCK_SCENES = [
  {
    id: 'current-map',
    name: 'Cursed Swampland',
    type: 'hexmap',
    active: true,
    layers: [
      { id: 'terrain', name: 'Terrain', visible: true },
      { id: 'features', name: 'Features', visible: true },
      { id: 'annotations', name: 'Annotations', visible: false },
    ],
  },
];

// ============================================================================
// AppSidebar - Scene View Panel
// ============================================================================

/**
 * Scene View Panel for organizing maps and layers
 * Simple creative tool workflow instead of enterprise navigation
 */
export const AppSidebar: React.FC<AppSidebarProps> = ({
  className = '',
}) => {
  const isOpen = useLayoutStore((state) => state.isOpen);

  // Return null when closed for full collapse functionality
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`h-full w-full flex flex-col border-r ${className}`}>
      {/* Header */}
      <div className="border-b">
        <div className="flex items-center gap-2 p-3">
          <Layers className="h-4 w-4" />
          <span className="font-medium text-sm">Scene</span>
          <span
            className="inline-flex items-center justify-center ml-auto h-6 w-6 rounded hover:bg-accent cursor-pointer"
            onClick={() => {
              // Handle add new scene
            }}
          >
            <Plus className="h-3 w-3" />
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto p-2">
        {/* Maps */}
        <div className="mb-2">
          <div className="px-2 py-1 text-xs text-muted-foreground">Maps</div>
          <ul className="flex w-full min-w-0 flex-col gap-1">
            {MOCK_SCENES.map((scene) => (
              <li key={scene.id} className="group relative">
                <button
                  className={`flex w-full items-center justify-between rounded-md p-2 text-left text-sm hover:bg-accent ${scene.active ? 'bg-accent font-medium' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <Map className="h-4 w-4" />
                    <span className="truncate">{scene.name}</span>
                  </div>
                  <span
                    className="inline-flex items-center justify-center h-4 w-4 rounded hover:bg-accent cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // More options
                    }}
                  >
                    <MoreHorizontal className="h-3 w-3" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Separator className="my-2" />

        {/* Layers */}
        <div>
          <div className="px-2 py-1 text-xs text-muted-foreground">Layers</div>
          <ul className="flex w-full min-w-0 flex-col gap-1">
            {MOCK_SCENES[0]?.layers.map((layer) => (
              <li key={layer.id}>
                <button className="flex w-full items-center justify-between rounded-md p-2 text-left text-sm hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${layer.visible ? 'bg-green-500' : 'bg-gray-300'}`}
                    />
                    <span className="truncate">{layer.name}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-2">
        <div className="text-xs text-muted-foreground px-2">Hexmap Editor</div>
      </div>
    </div>
  );
};

export default AppSidebar;
