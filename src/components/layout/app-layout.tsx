'use client';

/**
 * AppLayout - Root Application Layout Component
 * 
 * Orchestrates the complete professional layout system by combining
 * header, sidebar, and main content areas. Provides the foundational
 * structure for the entire application interface.
 * 
 * Features:
 * - Complete layout orchestration with proper component composition
 * - Integration with shadcn/ui SidebarProvider for layout state
 * - Responsive behavior with desktop-first approach
 * - Professional spacing and visual hierarchy
 * - Accessibility compliance and keyboard navigation
 */

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import AppToolbar from './app-toolbar';
import PropertiesPanel from './properties-panel-simple';
import MainContent from './main-content';
import { AuthErrorBoundary } from '../providers/auth-provider';
import StatusBar from './status-bar';
// import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

import { BaseLayoutProps } from '@/types/layout';
import { cn } from '@/lib/utils';
import { useLayoutStore } from '@/stores/layout';

// ============================================================================
// AppLayout Component
// ============================================================================

/**
 * AppLayout component providing the complete application layout structure
 * 
 * This component orchestrates all major layout components and provides
 * the necessary providers for state management and UI interactions.
 * 
 * @param props - AppLayout configuration props
 */
export const AppLayout: React.FC<BaseLayoutProps> = ({
  children,
  className = '',
}) => {
  const isOpen = useLayoutStore((state) => state.isOpen);
  const statusBarVisible = useLayoutStore((state) => state.statusBarVisible);
  const propertiesPanelOpen = useLayoutStore((state) => state.propertiesPanelOpen);
  const setScenePanelWidth = useLayoutStore((state) => state.setScenePanelWidth);
  const setPropertiesPanelWidth = useLayoutStore((state) => state.setPropertiesPanelWidth);
  
  // TODO: Enable keyboard shortcuts
  // useKeyboardShortcuts();
  
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className={cn('flex min-h-screen w-full flex-col', className)}>
          {/* Global Header spans full viewport width */}
          <AppHeader />
          {/* Global Toolbar spans full viewport width */}
          <AppToolbar />

          {/* Main editor area with resizable panels */}
          <div className="flex flex-1 min-h-0">
            <PanelGroup direction="horizontal">
              {/* Scene Panel (Resizable) */}
              {isOpen && (
                <Panel
                  id="scene-panel"
                  defaultSize={20}
                  minSize={15}
                  maxSize={30}
                  onResize={(size) => {
                    const width = Math.round((size / 100) * window.innerWidth);
                    setScenePanelWidth(width);
                  }}
                >
                  <AppSidebar />
                </Panel>
              )}

              {/* Resize handle for scene panel */}
              {isOpen && (
                <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors" />
              )}

              {/* Center content + optional properties panel */}
              <Panel
                minSize={50}
                // Provide a default size to avoid SSR layout shift
                defaultSize={isOpen ? 80 : 100}
              >
                <div className="flex flex-1 min-h-0">
                  <PanelGroup direction="horizontal">
                    <Panel
                      minSize={40}
                      // Provide a default size; complement of properties panel when open
                      defaultSize={propertiesPanelOpen ? 75 : 100}
                    >
                      <MainContent className="h-full">
                        {children}
                      </MainContent>
                    </Panel>

                    {propertiesPanelOpen && (
                      <>
                        <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors" />
                        <Panel
                          id="properties-panel"
                          defaultSize={25}
                          minSize={20}
                          maxSize={35}
                          onResize={(size) => {
                            const width = Math.round((size / 100) * window.innerWidth);
                            setPropertiesPanelWidth(width);
                          }}
                        >
                          <AuthErrorBoundary>
                            <PropertiesPanel />
                          </AuthErrorBoundary>
                        </Panel>
                      </>
                    )}
                  </PanelGroup>
                </div>
              </Panel>
            </PanelGroup>
          </div>

          {/* Status Bar spanning full width at bottom */}
          {statusBarVisible && <StatusBar />}
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

// ============================================================================
// Layout Provider Component (Alternative Implementation)
// ============================================================================

/**
 * LayoutProvider - Alternative layout provider for advanced use cases
 * 
 * Provides additional layout context and configuration options
 * for applications requiring more granular layout control.
 */
interface LayoutProviderProps extends BaseLayoutProps {
  /** Custom header component override */
  customHeader?: React.ComponentType;
  /** Custom sidebar component override */
  customSidebar?: React.ComponentType;
  /** Layout variant for different application modes */
  variant?: 'default' | 'compact' | 'wide';
  /** Header visibility control */
  showHeader?: boolean;
  /** Sidebar visibility control */
  showSidebar?: boolean;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  className = '',
  customHeader: CustomHeader,
  customSidebar: CustomSidebar,
  variant = 'default',
  showHeader = true,
  showSidebar = true,
}) => {
  /**
   * Get layout variant classes
   */
  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'container-sm mx-auto';
      case 'wide':
        return 'max-w-none';
      case 'default':
      default:
        return '';
    }
  };

  /**
   * Render header component
   */
  const renderHeader = () => {
    if (!showHeader) return null;
    
    if (CustomHeader) {
      return <CustomHeader />;
    }
    
    return <AppHeader />;
  };

  /**
   * Render sidebar component
   */
  const renderSidebar = () => {
    if (!showSidebar) return null;
    
    if (CustomSidebar) {
      return <CustomSidebar />;
    }
    
    return <AppSidebar />;
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className={cn('flex min-h-screen w-full', getVariantClasses(), className)}>
          {/* Conditional Sidebar */}
          {renderSidebar()}

          {/* Main Content Area */}
          <SidebarInset className="flex flex-col flex-1 min-w-0">
            {/* Conditional Header */}
            {renderHeader()}

            {/* Main Content */}
            <MainContent>
              {children}
            </MainContent>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

// ============================================================================
// Specialized Layout Components
// ============================================================================

/**
 * FullscreenLayout - Layout for fullscreen applications
 * 
 * Provides a layout without header and sidebar for immersive experiences
 * like editors, dashboards, or presentation modes.
 */
interface FullscreenLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const FullscreenLayout: React.FC<FullscreenLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn('min-h-screen w-full', className)}>
      <MainContent padding="none" className="h-screen">
        {children}
      </MainContent>
    </div>
  );
};

/**
 * CenteredLayout - Layout for centered content
 * 
 * Provides a layout with centered content, useful for login pages,
 * error pages, or other focused content presentations.
 */
interface CenteredLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CenteredLayout: React.FC<CenteredLayoutProps> = ({
  children,
  maxWidth = 'md',
  className = '',
}) => {
  const getMaxWidthClasses = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-sm';
      case 'md':
        return 'max-w-md';
      case 'lg':
        return 'max-w-lg';
      case 'xl':
        return 'max-w-xl';
      default:
        return 'max-w-md';
    }
  };

  return (
    <div className={cn('min-h-screen w-full flex items-center justify-center p-4', className)}>
      <div className={cn('w-full', getMaxWidthClasses())}>
        {children}
      </div>
    </div>
  );
};

// ============================================================================
// Layout Composition Utilities
// ============================================================================

/**
 * withLayout - HOC for wrapping components with layout
 * 
 * Provides a higher-order component pattern for applying
 * layout to specific components or pages.
 */
export const withLayout = <P extends object>(
  Component: React.ComponentType<P>,
  layoutProps?: Partial<LayoutProviderProps>
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <LayoutProvider {...layoutProps}>
        <Component {...props} />
      </LayoutProvider>
    );
  };

  WrappedComponent.displayName = `withLayout(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

/**
 * Layout composition utility for conditional layouts
 */
interface ConditionalLayoutProps {
  children: React.ReactNode;
  condition: boolean;
  layout: React.ComponentType<{ children: React.ReactNode }>;
  fallback?: React.ComponentType<{ children: React.ReactNode }>;
  layoutProps?: Record<string, unknown>;
  fallbackProps?: Record<string, unknown>;
}

export const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({
  children,
  condition,
  layout: Layout,
  fallback: Fallback,
  layoutProps = {},
  fallbackProps = {},
}) => {
  if (condition) {
    return (
      <Layout {...layoutProps}>
        {children}
      </Layout>
    );
  }

  if (Fallback) {
    return (
      <Fallback {...fallbackProps}>
        {children}
      </Fallback>
    );
  }

  return <>{children}</>;
};

// ============================================================================
// Default Export
// ============================================================================

export default AppLayout;
