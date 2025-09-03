# Property Panel Design System

## Overview
**Purpose:** Generic property panel for engineering applications that connects to item stores and dynamically populates with various data shapes
**Scope:** Parameter components, folder grouping, multi-selection support, read-only/readwrite modes
**Target Users:** Engineers, technical users working with configuration and data management

## Design Specifications

### Visual Hierarchy
- **Panel Container:** Clean white background with subtle borders
- **Folder Groups:** Collapsible sections with clear visual separation
- **Parameters:** Consistent spacing and alignment with clear labels
- **States:** Distinct visual treatment for read-only, error, and disabled states
- **Color Palette:** 
  - Primary: Neutral grays (#F8F9FA, #E9ECEF, #6C757D, #343A40)
  - Accent: Orange (#FF6B35 for active states, selections)
  - Error: Red (#DC3545)
  - Success: Green (#28A745)

### Component Structure
```
PropertyPanel
├── PanelHeader (optional)
├── FolderGroup[]
│   ├── FolderHeader (collapsible)
│   ├── DescriptionText (optional)
│   └── Parameter[]
└── DescriptionText (optional)
```

### Parameter Types
1. **Text Input** - Single/multi-line text fields
2. **Number Input** - Integer/float with validation
3. **Boolean Toggle** - Checkbox or toggle switch
4. **Dropdown Select** - Single selection from options
5. **Multi-Select** - Multiple selections with chips
6. **Slider** - Numeric range selection
7. **Color Picker** - Color selection with hex/rgb values
8. **File Path** - Path selection with browse button
9. **Image Display** - URL-based image preview
10. **Date/Time** - Date and time selection

### Responsive Behavior
- **Minimum Width:** 280px
- **Optimal Width:** 320-400px
- **Resize Handle:** Right edge for horizontal resizing
- **Parameter Layout:** Single column, stacked vertically
- **Label Truncation:** Ellipsis with full text in tooltip

## Implementation Guide

### React Component Architecture
```typescript
interface PropertyPanelProps {
  data: ItemStore;
  readOnly?: boolean;
  onValueChange?: (path: string, value: any) => void;
  onError?: (path: string, error: string) => void;
}

interface Parameter {
  key: string;
  label: string;
  type: ParameterType;
  value: any;
  description?: string;
  readOnly?: boolean;
  validation?: ValidationRule[];
  error?: string;
  children?: Parameter[];
}

interface FolderGroup {
  title: string;
  description?: string;
  collapsed?: boolean;
  parameters: Parameter[];
}
```

### ShadCN Component Mapping
- **Panel Container:** `Card` component
- **Folder Headers:** `Collapsible` with `Button` trigger
- **Text Inputs:** `Input` component
- **Number Inputs:** `Input` with type="number"
- **Toggles:** `Switch` component
- **Dropdowns:** `Select` component
- **Multi-Select:** `Command` with `Checkbox`
- **Sliders:** `Slider` component
- **Tooltips:** `Tooltip` for descriptions and errors

### State Management
```typescript
// Folder collapse states
const [folderStates, setFolderStates] = useLocalStorage('panel-folders', {});

// Parameter values with validation
const [parameterValues, setParameterValues] = useState({});
const [parameterErrors, setParameterErrors] = useState({});
```

## Design System Integration

### Design Tokens
```css
--panel-bg: #ffffff;
--panel-border: #e9ecef;
--panel-shadow: 0 2px 4px rgba(0,0,0,0.1);
--accent-primary: #ff6b35;
--accent-hover: #e55a2b;
--text-primary: #343a40;
--text-secondary: #6c757d;
--error-color: #dc3545;
--success-color: #28a745;
--border-radius: 6px;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
```

### Component Dependencies
- **FolderGroup** → Parameter components
- **Parameter** → Input components, validation utilities
- **ImageParameter** → Image loading and error handling
- **MultiSelectParameter** → Chip display, selection management

### Accessibility Features
- **Keyboard Navigation:** Tab order through parameters
- **ARIA Labels:** Descriptive labels for screen readers
- **Error Announcements:** Live regions for validation errors
- **Focus Management:** Clear focus indicators
- **Color Contrast:** WCAG AA compliance (4.5:1 ratio)

## Parameter Specifications

### Folder Group Component
- **Header:** Clickable with expand/collapse icon
- **State Persistence:** Remembers collapsed/expanded state
- **Description:** Optional text below header
- **Animation:** Smooth collapse/expand transition

### Read-Only Mode
- **Visual Treatment:** Grayed out labels, disabled inputs
- **Interaction:** No cursor changes, non-editable
- **Toggle:** Runtime switching between modes
- **Indication:** Clear visual cues for read-only state

### Error States
- **Visual:** Red border, error icon, error text
- **Tooltip:** Detailed error message on hover
- **Validation:** Real-time or on blur/submit
- **Recovery:** Clear errors when valid input provided

### Image Parameter
- **Display:** Thumbnail preview with aspect ratio preservation
- **Placeholder:** Default image for empty URLs
- **Error Handling:** Broken image fallback
- **Loading:** Spinner during image load

### Multi-Selection Support
- **Chips:** Selected items as removable chips
- **Dropdown:** Searchable list with checkboxes
- **Bulk Actions:** Select all/none options
- **Overflow:** Scroll or collapse for many selections

## Validation & Testing

## Validation & Testing

### Success Metrics
- **Usability:** Task completion rate >95%
- **Performance:** <100ms response time for value changes
- **Accessibility:** WCAG 2.1 AA compliance
- **Error Recovery:** Clear error resolution path
- **Theme Switching:** Seamless light/dark mode transitions

### Testing Approach
- **Unit Tests:** Individual parameter components and search functionality
- **Integration Tests:** Data binding, bulk operations, and comparison mode
- **Accessibility Tests:** Screen reader compatibility and keyboard navigation
- **Visual Regression:** Component appearance consistency across themes
- **Usability Testing:** Task-based scenarios with diverse data structures (user, triangle, utility pole, file)

### POC Validation Scenarios
1. **Single Item Display:** Show user profile with all parameter types
2. **Multi-selection Comparison:** Compare two utility poles side-by-side
3. **Bulk Operations:** Select multiple triangle parameters and reset values
4. **Search Functionality:** Find specific file metadata across folders
5. **Theme Switching:** Toggle between light and dark modes during use
6. **Child Properties:** Expand maintenance photos in utility pole data
7. **Read-only Mode:** Toggle triangle calculated values between modes
8. **Error States:** Trigger validation errors on number inputs
9. **Panel Resizing:** Drag panel from minimum to maximum width, test parameter reflow
10. **Copy/Paste Operations:** Copy parameters between folders, paste values between compatible types
11. **Clipboard Integration:** Copy/paste values to/from external applications

### Iteration Plan
1. **Phase 1:** Core parameter types and folder grouping
2. **Phase 2:** Advanced parameters (image, multi-select)
3. **Phase 3:** Validation framework and error handling
4. **Phase 4:** Performance optimization and accessibility audit
5. **Phase 5:** Multi-panel coordination and state synchronization

## Implementation Priority
1. **Folder Groups** - Collapsible containers
2. **Basic Parameters** - Text, number, boolean, dropdown
3. **Description Text** - Inline documentation
4. **Read-Only Mode** - State toggle functionality
5. **Error States** - Validation and error display
6. **Image Parameter** - URL-based image display
7. **Multi-Select** - Complex selection handling
8. **Advanced Parameters** - Slider, color picker, date/time

