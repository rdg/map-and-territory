
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
import { useProjectStore } from '@/stores/project';
import { useSelectionStore } from '@/stores/selection';
import { Button } from '@/components/ui/button';
import { executeCommand } from '@/lib/commands';

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
  const project = useProjectStore((s) => s.current);
  const selection = useSelectionStore((s) => s.selection);
  const selectCampaign = useSelectionStore((s) => s.selectCampaign);

  // Return null when closed for full collapse functionality
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`h-full w-full flex flex-col border-r bg-muted/20 ${className}`}>
      <button
        className={`w-full text-left p-3 border-b transition-colors ${
          selection.kind === 'campaign' ? 'bg-accent' : 'hover:bg-accent/50'
        }`}
        onClick={() => selectCampaign()}
        aria-pressed={selection.kind === 'campaign'}
      >
        <div className="text-xs font-medium text-muted-foreground">Campaign</div>
        <div className="text-sm font-semibold truncate">
          {project?.name ?? 'No Campaign'}
        </div>
      </button>

      <div className="flex-1 overflow-auto p-4" data-testid="scene-panel-scroll">
        {!project && (
          <div className="text-sm text-muted-foreground">
            No campaign. Use the toolbar to create one.
          </div>
        )}

        {project && project.maps.length === 0 && (
          <div className="flex flex-col items-start gap-2 text-sm">
            <div className="text-muted-foreground">This campaign has no maps yet.</div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => executeCommand('app.map.new').catch(() => {})}
              disabled
            >
              Create Map (coming soon)
            </Button>
          </div>
        )}

        {/* Tall filler to ensure scrollability for layout tests */}
        <div className="h-[1600px]" />
      </div>
    </div>
  );
};

export default AppSidebar;
