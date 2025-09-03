'use client';

/**
 * AppToolbar - Creative Tool Horizontal Toolbar
 * 
 * Icon-based toolbar for creative hexmap editing tools.
 * Positioned below header, spans full width.
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { useLayoutStore } from '@/stores/layout';

// Creative tool icons
import {
  PanelLeftOpen,
  PanelLeftClose,
  MousePointer2,
  Paintbrush,
  Pen,
  Eraser,
  Type,
  ZoomIn,
  Grid3x3,
  PanelRightOpen,
  PanelRightClose,
} from 'lucide-react';

// ============================================================================
// Tool Definitions
// ============================================================================

const CREATIVE_TOOLS = [
  { id: 'select', name: 'Select', icon: MousePointer2, shortcut: '1' },
  { id: 'paint', name: 'Hex Paint', icon: Paintbrush, shortcut: '2' },
  { id: 'draw', name: 'Draw', icon: Pen, shortcut: '3' },
  { id: 'erase', name: 'Erase', icon: Eraser, shortcut: '4' },
  { id: 'text', name: 'Text', icon: Type, shortcut: '5' },
] as const;

const VIEW_TOOLS = [
  { id: 'zoom', name: 'Zoom', icon: ZoomIn, shortcut: 'Z' },
  { id: 'grid', name: 'Grid Toggle', icon: Grid3x3, shortcut: 'G' },
] as const;

// ============================================================================
// AppToolbar Component
// ============================================================================

export const AppToolbar: React.FC = () => {
  const isOpen = useLayoutStore((state) => state.isOpen);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  
  // TODO: Add to store - for now just use local state
  const [activeTool, setActiveTool] = React.useState('select');
  const [propertiesPanelOpen, setPropertiesPanelOpen] = React.useState(true);

  /**
   * Render tool button with tooltip
   */
  const renderToolButton = (tool: typeof CREATIVE_TOOLS[0] | typeof VIEW_TOOLS[0], isActive = false) => (
    <Tooltip key={tool.id}>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? 'default' : 'ghost'}
          size="sm"
          className={`h-8 w-8 p-0 transition-colors duration-150 ${
            isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
          }`}
          onClick={() => setActiveTool(tool.id)}
        >
          <tool.icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <div className="flex items-center gap-2">
          <span>{tool.name}</span>
          <kbd className="px-1 py-0.5 text-xs bg-muted rounded">{tool.shortcut}</kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );

  return (
    <div className="border-b bg-background">
      <div className="flex items-center gap-2 px-3 py-2">
        
        {/* Scene Panel Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex items-center gap-2">
              <span>Toggle Scene Panel</span>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">F1</kbd>
            </div>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6" />

        {/* Creative Tools */}
        <div className="flex items-center gap-1">
          {CREATIVE_TOOLS.map((tool) => 
            renderToolButton(tool, activeTool === tool.id)
          )}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* View Tools */}
        <div className="flex items-center gap-1">
          {VIEW_TOOLS.map((tool) => 
            renderToolButton(tool, false)
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Properties Panel Toggle */}
        <Separator orientation="vertical" className="h-6" />
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setPropertiesPanelOpen(!propertiesPanelOpen)}
            >
              {propertiesPanelOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <div className="flex items-center gap-2">
              <span>Toggle Properties Panel</span>
              <kbd className="px-1 py-0.5 text-xs bg-muted rounded">F2</kbd>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default AppToolbar;