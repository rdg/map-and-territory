'use client';

/**
 * AppSidebar - Scene View Panel for Hexmap Editor
 * 
 * Simple scene organization panel for managing maps and layers.
 * Replaces enterprise navigation with creative tool workflow.
 */

import React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
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
  const variant = useLayoutStore((state) => state.variant);
  const collapsible = useLayoutStore((state) => state.collapsible);

  // Return null when closed for full collapse functionality
  if (!isOpen) {
    return null;
  }

  return (
    <Sidebar
      variant={variant}
      collapsible={collapsible}
      className={className}
    >
      {/* Scene View Header */}
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 p-3">
          {isOpen && (
            <>
              <Layers className="h-4 w-4" />
              <span className="font-medium text-sm">Scene</span>
            </>
          )}
          <span 
            className="inline-flex items-center justify-center ml-auto h-6 w-6 rounded hover:bg-accent cursor-pointer"
            onClick={() => {
              // Handle add new scene
            }}
          >
            <Plus className="h-3 w-3" />
          </span>
        </div>
      </SidebarHeader>

      {/* Scene Content */}
      <SidebarContent className="p-2">
        {/* Current Map */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1 text-xs">Maps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_SCENES.map((scene) => (
                <SidebarMenuItem key={scene.id}>
                  <SidebarMenuButton
                    isActive={scene.active}
                    className="justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4" />
                      <span className="text-sm">{scene.name}</span>
                    </div>
                    <span 
                      className="inline-flex items-center justify-center h-4 w-4 rounded hover:bg-accent cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle more options menu
                      }}
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Layers */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1 text-xs">Layers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_SCENES[0]?.layers.map((layer) => (
                <SidebarMenuItem key={layer.id}>
                  <SidebarMenuButton className="justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`h-2 w-2 rounded-full ${
                          layer.visible ? 'bg-green-500' : 'bg-gray-300'
                        }`} 
                      />
                      <span className="text-sm">{layer.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Scene Footer */}
      <SidebarFooter className="border-t p-2">
        <div className="text-xs text-muted-foreground px-2">
          {isOpen ? 'Hexmap Editor' : ''}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;