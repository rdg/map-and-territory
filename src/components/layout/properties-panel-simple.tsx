'use client';

/**
 * PropertiesPanel - Simplified Stable Version
 * 
 * A simplified properties panel that avoids infinite re-renders
 * by using static content and minimal dynamic updates.
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

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
  return (
    <div className={`w-80 border-l bg-background ${className}`}>
      <div className="p-4 space-y-4">
        {/* Tool Header */}
        <div className="flex items-center gap-2">
          <MousePointer2 className="h-4 w-4" />
          <div>
            <h3 className="font-medium text-sm">Selection Tool</h3>
            <p className="text-xs text-muted-foreground">Select and transform map elements</p>
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
            <div className="space-y-2">
              <div className="text-sm font-medium">X Position</div>
              <Input
                type="number"
                defaultValue="0"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Y Position</div>
              <Input
                type="number"
                defaultValue="0"
                className="h-8"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Rotation: 0°</div>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{width: '0%'}} />
              </div>
            </div>
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
                defaultValue="Terrain"
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