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

import { useLayoutStore } from '@/stores/layout';

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
    <div
      className={`h-full w-full border-l bg-blue-50 flex flex-col min-h-0 ${className}`}
      data-testid="properties-panel"
    />
  );
};

export default PropertiesPanel;
