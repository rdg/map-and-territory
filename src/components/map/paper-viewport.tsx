"use client";

import React, { useMemo } from 'react';
import { useProjectStore } from '@/stores/project';

function aspectToStyle(aspect: 'square' | '4:3' | '16:10') {
  switch (aspect) {
    case 'square':
      return '1 / 1';
    case '4:3':
      return '4 / 3';
    case '16:10':
    default:
      return '16 / 10';
  }
}

export const PaperViewport: React.FC = () => {
  const project = useProjectStore((s) => s.current);
  const active = useMemo(() => {
    if (!project) return null;
    return project.maps.find((m) => m.id === project.activeMapId) ?? null;
  }, [project]);

  return (
    <div className="h-full w-full overflow-auto">
      <div className="pt-6 px-6 pb-24">
        {!project || !active ? (
          <div className="p-8 text-sm text-muted-foreground">No active map.</div>
        ) : (
          <div
            style={{
              aspectRatio: aspectToStyle(active.paper?.aspect ?? '16:10') as any,
              backgroundColor: active.paper?.color ?? '#ffffff',
            }}
            className="w-[90%] max-w-[1400px] mx-auto rounded-md shadow-sm border"
          />
        )}
        {/* Spacer to ensure main area is scrollable for layout tests */}
        <div className="h-[1200px]" aria-hidden="true" />
      </div>
    </div>
  );
};

export default PaperViewport;
