'use client';

/**
 * PropertiesPanel - Simplified Stable Version
 * 
 * A simplified properties panel that avoids infinite re-renders
 * by using static content and minimal dynamic updates.
 */

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

import { useLayoutStore } from '@/stores/layout';
import { useSelectionStore } from '@/stores/selection';
import { useProjectStore } from '@/stores/project';

// Icons
import {
  Settings,
  Palette,
  Layers,
  MousePointer2,
} from 'lucide-react';

// ============================================================================
// PropertiesPanel Component
// ============================================================================

interface PropertiesPanelProps {
  className?: string;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  className = '',
}) => {
  const propertiesPanelOpen = useLayoutStore((state) => state.propertiesPanelOpen);
  
  if (!propertiesPanelOpen) {
    return null;
  }
  
  return (
    <div className={`h-full w-full border-l bg-background flex flex-col min-h-0 ${className}`} data-testid="properties-panel">
      <div className="p-3 border-b text-xs font-medium text-muted-foreground">Properties</div>
      <div className="p-3 space-y-4 overflow-auto">
        <CampaignProperties />
        <MapProperties />
      </div>
    </div>
  );
};

export default PropertiesPanel;

// ============================================================================
// Widgets - MVP
// ============================================================================

const FieldLabel: React.FC<{ label: string }> = ({ label }) => (
  <div className="text-xs text-foreground mb-1">{label}</div>
);

const Group: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <div className="text-[11px] uppercase tracking-wide text-foreground mb-2">{title}</div>
    <div className="space-y-3">{children}</div>
    <Separator className="my-3" />
  </div>
);

// ============================================================================
// Campaign Properties
// ============================================================================

const CampaignProperties: React.FC = () => {
  const selection = useSelectionStore((s) => s.selection);
  const project = useProjectStore((s) => s.current);
  const rename = useProjectStore((s) => s.rename);
  const setDescription = useProjectStore((s) => s.setDescription);

  if (selection.kind !== 'campaign' || !project) return null;

  return (
    <Group title="Campaign">
      <div>
        <FieldLabel label="Name" />
        <Input
          value={project.name}
          onChange={(e) => rename(e.target.value)}
          placeholder="Untitled Campaign"
          aria-label="Campaign Name"
        />
      </div>
      <div>
        <FieldLabel label="Description" />
        <Textarea
          value={project.description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          rows={5}
          aria-label="Campaign Description"
        />
      </div>
    </Group>
  );
};

const MapProperties: React.FC = () => {
  const selection = useSelectionStore((s) => s.selection);
  const project = useProjectStore((s) => s.current);
  const renameMap = useProjectStore((s) => s.renameMap);
  const setMapDescription = useProjectStore((s) => s.setMapDescription);

  if (selection.kind !== 'map' || !project) return null;
  const map = project.maps.find((m) => m.id === selection.id);
  if (!map) return null;

  return (
    <Group title="Map">
      <div>
        <FieldLabel label="Title" />
        <Input
          value={map.name}
          onChange={(e) => renameMap(map.id, e.target.value)}
          placeholder="Untitled Map"
          aria-label="Map Title"
        />
      </div>
      <div>
        <FieldLabel label="Description" />
        <Textarea
          value={map.description ?? ''}
          onChange={(e) => setMapDescription(map.id, e.target.value)}
          placeholder="Optional description"
          rows={4}
          aria-label="Map Description"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          id={`map-visible-${map.id}`}
          type="checkbox"
          className="h-3 w-3"
          checked={map.visible}
          onChange={(e) => useProjectStore.getState().setMapVisibility(map.id, e.target.checked)}
        />
        <label htmlFor={`map-visible-${map.id}`} className="text-xs">Visible</label>
      </div>
    </Group>
  );
};
