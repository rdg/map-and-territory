/**
 * Layout Stores - Main Export Index and Composed Store
 * 
 * This file provides a complete layout store implementation using
 * focused slices for maintainability, while maintaining backwards
 * compatibility with the previous monolithic store interface.
 * 
 * Architecture: Focused store slices composed into a complete store
 * with selective persistence and development utilities.
 */

import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';

import { LayoutState, DEFAULT_LAYOUT_STATE } from '../../types/layout';

// ============================================================================
// Re-export Individual Slices
// ============================================================================

export * from './sidebar-store';
export * from './preferences-store';
export * from './navigation-store';
export * from './composition';

// ============================================================================
// Complete Layout Store Implementation
// ============================================================================

/**
 * Combined layout store interface for the complete store
 */
interface CompleteLayoutStore {
  // Sidebar state
  isOpen: boolean;
  variant: 'sidebar' | 'inset';
  collapsible: 'icon' | 'none';
  
  // Preferences state
  theme: 'light' | 'dark' | 'system';
  sidebarWidth: number;
  persistCollapsed: boolean;
  
  // Navigation state
  activeSection: string;
  breadcrumb: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    isCurrent?: boolean;
  }>;
  
  // Creative tool state
  activeTool: string;
  propertiesPanelOpen: boolean;
  
  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setSidebarVariant: (variant: 'sidebar' | 'inset') => void;
  setSidebarCollapsible: (collapsible: 'icon' | 'none') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarWidth: (width: number) => void;
  setPersistCollapsed: (persist: boolean) => void;
  setActiveSection: (section: string) => void;
  setBreadcrumb: (items: Array<{
    label: string;
    href?: string;
    icon?: React.ReactNode;
    isCurrent?: boolean;
  }>) => void;
  addBreadcrumb: (item: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    isCurrent?: boolean;
  }) => void;
  clearBreadcrumb: () => void;
  setActiveTool: (tool: string) => void;
  togglePropertiesPanel: () => void;
  setPropertiesPanelOpen: (open: boolean) => void;
  resetLayout: () => void;
  loadPreferences: () => void;
}

/**
 * Main layout store implementation combining all focused slices
 * 
 * Uses immer middleware for immutable updates, devtools for debugging,
 * and selective persistence to avoid storing ephemeral state.
 */
export const useLayoutStore = create<CompleteLayoutStore>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer<CompleteLayoutStore>((set, get) => ({
          // ================================================================
          // Initial State from Defaults
          // ================================================================
          ...DEFAULT_LAYOUT_STATE.sidebar,
          ...DEFAULT_LAYOUT_STATE.preferences,
          ...DEFAULT_LAYOUT_STATE.navigation,
          
          // Creative tool defaults
          activeTool: 'select',
          propertiesPanelOpen: true,

          // ================================================================
          // Sidebar Actions
          // ================================================================
          toggleSidebar: () => {
            set((state) => {
              state.isOpen = !state.isOpen;
            });
          },

          setSidebarOpen: (open: boolean) => {
            set((state) => {
              state.isOpen = open;
            });
          },

          setSidebarVariant: (variant) => {
            set((state) => {
              state.variant = variant;
            });
          },

          setSidebarCollapsible: (collapsible) => {
            set((state) => {
              state.collapsible = collapsible;
            });
          },

          // ================================================================
          // Preferences Actions
          // ================================================================
          setTheme: (theme) => {
            set((state) => {
              state.theme = theme;
            });
          },

          setSidebarWidth: (width: number) => {
            set((state) => {
              state.sidebarWidth = width;
            });
          },

          setPersistCollapsed: (persist: boolean) => {
            set((state) => {
              state.persistCollapsed = persist;
            });
          },

          // ================================================================
          // Navigation Actions
          // ================================================================
          setActiveSection: (section: string) => {
            set((state) => {
              state.activeSection = section;
            });
          },

          setBreadcrumb: (items) => {
            set((state) => {
              state.breadcrumb = items;
            });
          },

          addBreadcrumb: (item) => {
            set((state) => {
              // Mark previous items as not current
              state.breadcrumb.forEach((breadcrumb) => {
                breadcrumb.isCurrent = false;
              });
              
              // Add new item as current
              state.breadcrumb.push({
                ...item,
                isCurrent: true,
              });
            });
          },

          clearBreadcrumb: () => {
            set((state) => {
              state.breadcrumb = [];
            });
          },

          // ================================================================
          // Creative Tool Actions
          // ================================================================
          setActiveTool: (tool: string) => {
            set((state) => {
              state.activeTool = tool;
            });
          },

          togglePropertiesPanel: () => {
            set((state) => {
              state.propertiesPanelOpen = !state.propertiesPanelOpen;
            });
          },

          setPropertiesPanelOpen: (open: boolean) => {
            set((state) => {
              state.propertiesPanelOpen = open;
            });
          },

          // ================================================================
          // Additional Composed Actions
          // ================================================================

          /**
           * Reset layout to default state
           * Preserves user preferences but resets UI state
           */
          resetLayout: () => {
            set((state) => {
              // Reset sidebar and navigation, preserve preferences
              state.isOpen = DEFAULT_LAYOUT_STATE.sidebar.isOpen;
              state.variant = DEFAULT_LAYOUT_STATE.sidebar.variant;
              state.collapsible = DEFAULT_LAYOUT_STATE.sidebar.collapsible;
              state.activeSection = DEFAULT_LAYOUT_STATE.navigation.activeSection;
              state.breadcrumb = DEFAULT_LAYOUT_STATE.navigation.breadcrumb;
              // Keep existing preferences
            });
          },

          /**
           * Load saved preferences from persistence layer
           * Triggers re-hydration of persisted state
           */
          loadPreferences: () => {
            // This is handled automatically by the persist middleware
            // This method is provided for explicit preference refresh if needed
            const currentState = get();
            console.log('Current layout preferences:', {
              theme: currentState.theme,
              sidebarWidth: currentState.sidebarWidth,
              persistCollapsed: currentState.persistCollapsed,
            });
          },
        }))
      ),
      {
        // ================================================================
        // Persistence Configuration
        // ================================================================
        name: 'map-territory-layout',
        
        /**
         * Selective persistence - only persist user preferences and
         * sidebar state (if persistCollapsed is true)
         */
        partialize: (state): Partial<LayoutState> => {
          return {
            preferences: {
              theme: state.theme,
              sidebarWidth: state.sidebarWidth,
              persistCollapsed: state.persistCollapsed,
            },
            sidebar: {
              // Only persist sidebar open state if user wants it persisted
              isOpen: state.persistCollapsed 
                ? state.isOpen 
                : DEFAULT_LAYOUT_STATE.sidebar.isOpen,
              variant: state.variant,
              collapsible: state.collapsible,
            },
            // Don't persist navigation state - it should reset on page load
          };
        },

        /**
         * Migration handling for future schema changes
         */
        version: 1,
        migrate: (persistedState: unknown) => {
          // Future migration logic will go here
          return persistedState as LayoutState;
        },

        /**
         * Skip hydration on SSR to prevent hydration mismatches
         */
        skipHydration: typeof window === 'undefined',
      }
    ),
    {
      // Devtools configuration
      name: 'LayoutStore',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ============================================================================
// Direct Store Access (Recommended)
// ============================================================================

// Use useLayoutStore((state) => state.propertyName) directly in components
// This provides better TypeScript support and avoids selector complications

// ============================================================================
// Store Utilities (Backwards Compatibility)
// ============================================================================

/**
 * Get current layout state (non-reactive)
 * Useful for one-time state access outside React components
 */
export const getLayoutState = (): LayoutState => {
  const store = useLayoutStore.getState();
  return {
    sidebar: {
      isOpen: store.isOpen,
      variant: store.variant,
      collapsible: store.collapsible,
    },
    preferences: {
      theme: store.theme,
      sidebarWidth: store.sidebarWidth,
      persistCollapsed: store.persistCollapsed,
    },
    navigation: {
      activeSection: store.activeSection,
      breadcrumb: store.breadcrumb,
    },
    tools: {
      activeTool: store.activeTool,
      propertiesPanelOpen: store.propertiesPanelOpen,
    },
  };
};

/**
 * Subscribe to specific layout state changes
 * Useful for external integrations or logging
 */
export const subscribeToLayoutChanges = <T>(
  selector: (state: LayoutState) => T,
  callback: (value: T, previousValue: T) => void
) => {
  return useLayoutStore.subscribe(
    (state) => selector({
      sidebar: { isOpen: state.isOpen, variant: state.variant, collapsible: state.collapsible },
      preferences: { theme: state.theme, sidebarWidth: state.sidebarWidth, persistCollapsed: state.persistCollapsed },
      navigation: { activeSection: state.activeSection, breadcrumb: state.breadcrumb },
    }),
    callback
  );
};

/**
 * Reset layout store to initial state
 * Useful for testing or admin actions
 */
export const resetLayoutStore = () => {
  useLayoutStore.setState({
    ...DEFAULT_LAYOUT_STATE.sidebar,
    ...DEFAULT_LAYOUT_STATE.preferences,
    ...DEFAULT_LAYOUT_STATE.navigation,
  });
};

/**
 * Development-only function to log current store state
 * @param label - Optional label for the log
 */
export const debugLayoutState = (label = 'Layout State') => {
  if (process.env.NODE_ENV === 'development') {
    console.group(label);
    console.log('Current state:', getLayoutState());
    console.groupEnd();
  }
};

// ============================================================================
// Public Selector Hooks (Official Surface)
// ============================================================================

/**
 * Public Store API Surface
 *
 * Philosophy
 * - useLayoutStore is the core primitive. Prefer selecting the minimal slice
 *   needed to avoid unnecessary component re-renders.
 * - These helper hooks provide ergonomic, narrowly-scoped selectors for
 *   common UI concerns (sidebar, preferences, navigation) while keeping
 *   boundaries clear and predictable.
 * - Keep selections stable and avoid returning new object identities unless
 *   necessary; these helpers return small, flat objects to reduce churn.
 *
 * Usage
 *   const { isOpen } = useSidebarState()
 *   const { setTheme } = useThemeActions()
 *   const { breadcrumb } = useNavigationState()
 */

/**
 * useSidebarState - Reactive selector for sidebar UI state
 */
export const useSidebarState = () =>
  useLayoutStore((state) => ({
    isOpen: state.isOpen,
    variant: state.variant,
    collapsible: state.collapsible,
  }), shallow);

/**
 * useLayoutPreferences - Reactive selector for user preferences
 */
export const useLayoutPreferences = () =>
  useLayoutStore((state) => ({
    theme: state.theme,
    sidebarWidth: state.sidebarWidth,
    persistCollapsed: state.persistCollapsed,
  }), shallow);

/**
 * useNavigationState - Reactive selector for navigation state
 */
export const useNavigationState = () =>
  useLayoutStore((state) => ({
    activeSection: state.activeSection,
    breadcrumb: state.breadcrumb,
  }), shallow);

/**
 * useSidebarActions - Sidebar action selectors
 */
export const useSidebarActions = () =>
  useLayoutStore((state) => ({
    toggleSidebar: state.toggleSidebar,
    setSidebarOpen: state.setSidebarOpen,
    setSidebarVariant: state.setSidebarVariant,
    setSidebarCollapsible: state.setSidebarCollapsible,
  }), shallow);

/**
 * useThemeActions - Preferences action selectors
 */
export const useThemeActions = () =>
  useLayoutStore((state) => ({
    setTheme: state.setTheme,
    setSidebarWidth: state.setSidebarWidth,
    setPersistCollapsed: state.setPersistCollapsed,
  }), shallow);

/**
 * useNavigationActions - Navigation action selectors
 */
export const useNavigationActions = () =>
  useLayoutStore((state) => ({
    setActiveSection: state.setActiveSection,
    setBreadcrumb: state.setBreadcrumb,
    addBreadcrumb: state.addBreadcrumb,
    clearBreadcrumb: state.clearBreadcrumb,
  }), shallow);

/**
 * useToolState - Creative tool state selectors
 */
export const useToolState = () =>
  useLayoutStore((state) => ({
    activeTool: state.activeTool,
    propertiesPanelOpen: state.propertiesPanelOpen,
  }), shallow);

/**
 * useToolActions - Creative tool action selectors
 */
export const useToolActions = () =>
  useLayoutStore((state) => ({
    setActiveTool: state.setActiveTool,
    togglePropertiesPanel: state.togglePropertiesPanel,
    setPropertiesPanelOpen: state.setPropertiesPanelOpen,
  }), shallow);
