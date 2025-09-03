
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
    <div className={`h-full w-full flex flex-col border-r bg-red-50 ${className}`}></div>
  );
};

export default AppSidebar;
