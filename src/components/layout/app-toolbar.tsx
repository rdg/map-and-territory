'use client';

/**
 * AppToolbar - Creative Tool Horizontal Toolbar
 * 
 * Icon-based toolbar for creative hexmap editing tools.
 * Positioned below header, spans full width.
 */

import React, { useEffect, useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { LucideIcon, FilePlus } from 'lucide-react';

import { useLayoutStore } from '@/stores/layout';
import { executeCommand } from '@/lib/commands';
import { getToolbarContributions } from '@/plugin/loader';

// Creative tool icons
import { PanelLeftOpen, PanelLeftClose, PanelRightOpen, PanelRightClose } from 'lucide-react';

// Dynamic toolbar contributions are rendered from the plugin loader

// ============================================================================
// AppToolbar Component
// ============================================================================

export const AppToolbar: React.FC = () => {
  const EMPTY: ReadonlyArray<ReturnType<typeof getToolbarContributions>[number]> = [];
  const isOpen = useLayoutStore((state) => state.isOpen);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  
  // Use store state instead of local state
  const propertiesPanelOpen = useLayoutStore((state) => state.propertiesPanelOpen);
  const togglePropertiesPanel = useLayoutStore((state) => state.togglePropertiesPanel);

  // Commands come from plugin loader; no local registration here

  // no static tool buttons in MVP; all tools come from contributions later

  return (
    <div className="w-full border-b bg-background">
      <div className="flex items-center gap-2 px-3 py-2">
        {/* Scene Panel Toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={toggleSidebar}
              aria-label="Toggle Scene Panel"
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

        {/* Dynamic toolbar contributions: first group after left divider */}
        <div className="flex items-center gap-1">
          {useSyncExternalStore(
            // subscribe to toolbar updates
            (cb) => {
              const handler = () => cb();
              if (typeof window !== 'undefined') {
                window.addEventListener('plugin:toolbar-updated', handler);
              }
              return () => {
                if (typeof window !== 'undefined') {
                  window.removeEventListener('plugin:toolbar-updated', handler);
                }
              };
            },
            // getSnapshot
            () => getToolbarContributions(),
            // getServerSnapshot
            () => EMPTY
          )
            .sort((a, b) => {
              // campaign group first; then by order then label
              const ga = a.group === 'campaign' ? 0 : 1;
              const gb = b.group === 'campaign' ? 0 : 1;
              if (ga !== gb) return ga - gb;
              const oa = a.order ?? 0;
              const ob = b.order ?? 0;
              if (oa !== ob) return oa - ob;
              return (a.label || a.command).localeCompare(b.label || b.command);
            })
            .map((item, idx) => {
              const aria = item.label || item.command;
              // Minimal icon resolver for MVP
              const Icon = FilePlus as LucideIcon;
              return (
                <Button
                  key={`${item.pluginId}:${item.group}:${item.command}:${idx}`}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  aria-label={aria}
                  onClick={() => executeCommand(item.command).catch(console.error)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
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
              onClick={togglePropertiesPanel}
              aria-label="Toggle Properties Panel"
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
