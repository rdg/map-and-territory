'use client';

/**
 * PropertiesPanel - Context-Sensitive Properties Panel
 * 
 * Right-side panel showing properties for selected elements or active tools.
 * Updates based on current selection and active creative tool.
 */

import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
// import { Slider } from '@/components/ui/slider';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToolState } from '@/stores/layout';

// Icons
import {
  Settings,
  Palette,
  Layers,
  MousePointer2,
  Paintbrush,
} from 'lucide-react';

// ============================================================================
// Mock Data - Tool Properties
// ============================================================================

const TOOL_PROPERTIES = {
  select: {
    icon: MousePointer2,
    title: 'Selection Tool',
    description: 'Select and transform map elements',
    properties: [
      { id: 'x', label: 'X Position', type: 'number', value: 0 },
      { id: 'y', label: 'Y Position', type: 'number', value: 0 },
      { id: 'rotation', label: 'Rotation', type: 'slider', value: [0], min: 0, max: 360 },
    ],
  },
  paint: {
    icon: Paintbrush,
    title: 'Hex Paint Tool',
    description: 'Paint terrain on hexagonal tiles',
    properties: [
      { id: 'terrain', label: 'Terrain Type', type: 'select', value: 'forest', options: ['forest', 'mountain', 'swamp', 'desert'] },
      { id: 'brush_size', label: 'Brush Size', type: 'slider', value: [3], min: 1, max: 10 },
      { id: 'opacity', label: 'Opacity', type: 'slider', value: [100], min: 0, max: 100 },
    ],
  },
  draw: {
    icon: Settings,
    title: 'Draw Tool',
    description: 'Draw custom shapes and lines',
    properties: [
      { id: 'stroke_width', label: 'Stroke Width', type: 'slider', value: [2], min: 1, max: 10 },
      { id: 'color', label: 'Color', type: 'text', value: '#000000' },
      { id: 'style', label: 'Line Style', type: 'select', value: 'solid', options: ['solid', 'dashed', 'dotted'] },
    ],
  },
} as const;

// ============================================================================
// PropertiesPanel Component
// ============================================================================

interface PropertiesPanelProps {
  className?: string;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  className = '',
}) => {
  const { activeTool, propertiesPanelOpen } = useToolState();
  const toolProperties = TOOL_PROPERTIES[activeTool as keyof typeof TOOL_PROPERTIES] || TOOL_PROPERTIES.select;

  // Always render but transform off-screen when closed
  const isVisible = propertiesPanelOpen;

  /**
   * Render property input based on type
   */
  const renderProperty = useCallback((property: any) => {
    const { id, label, type, value, min, max, options } = property;

    switch (type) {
      case 'number':
        return (
          <div key={id} className="space-y-2">
            <div className="text-sm font-medium">{label}</div>
            <Input
              id={id}
              type="number"
              value={value}
              onChange={() => {/* Handle property change */}}
              className="h-8"
            />
          </div>
        );

      case 'text':
        return (
          <div key={id} className="space-y-2">
            <div className="text-sm font-medium">{label}</div>
            <Input
              id={id}
              type="text"
              value={value}
              onChange={() => {/* Handle property change */}}
              className="h-8"
            />
          </div>
        );

      case 'slider':
        return (
          <div key={id} className="space-y-2">
            <div className="text-sm font-medium">
              {label}: {value[0]}{max === 360 ? '°' : ''}
            </div>
            <div className="h-2 bg-secondary rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{width: `${(value[0] / (max || 100)) * 100}%`}} />
            </div>
          </div>
        );

      case 'select':
        return (
          <div key={id} className="space-y-2">
            <div className="text-sm font-medium">{label}</div>
            <div className="p-2 border rounded text-sm bg-background">
              {options?.find(opt => opt === value) || value}
            </div>
          </div>
        );

      default:
        return null;
    }
  }, []);

  return (
    <div className={`w-80 border-l bg-background transition-transform duration-200 ease-out ${
      isVisible ? 'translate-x-0' : 'translate-x-full'
    } ${className}`}>
      <div className="p-4 space-y-4">
        {/* Tool Header */}
        <div className="flex items-center gap-2">
          <toolProperties.icon className="h-4 w-4" />
          <div>
            <h3 className="font-medium text-sm">{toolProperties.title}</h3>
            <p className="text-xs text-muted-foreground">{toolProperties.description}</p>
          </div>
        </div>

        <Separator />

        {/* Tool Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Settings className="h-3 w-3" />
              Tool Properties
            </CardTitle>
            <CardDescription className="text-xs">
              Adjust settings for the active tool
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {toolProperties.properties.map(renderProperty)}
          </CardContent>
        </Card>

        {/* Layer Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Layers className="h-3 w-3" />
              Layer Properties
            </CardTitle>
            <CardDescription className="text-xs">
              Current layer settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Layer Name</div>
              <Input 
                value="Terrain" 
                onChange={() => {/* Handle layer name change */}}
                className="h-8" 
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Opacity: 100%</div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{width: '100%'}} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Visible</div>
              <Button variant="outline" size="sm" className="h-6 w-12 text-xs">
                On
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Selection Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Palette className="h-3 w-3" />
              Selection
            </CardTitle>
            <CardDescription className="text-xs">
              No elements selected
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Select an element on the map to view its properties
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertiesPanel;