Feature: Professional Layout Architecture
  As a Game Master or Content Creator
  I want a professional content editing interface with collapsible panels and multi-document support
  So that I can efficiently create atmospheric maps with professional-grade tools that don't interfere with my creative flow

  Background:
    Given I am using the map and territory hex editor
    And the application has loaded with the professional layout
    And I have at least one map project open

  Scenario: Panel collapse and expand for focused editing
    Given both scene view and property panels are visible
    When I click the collapse icon on the scene view panel
    Then the scene view panel collapses to show only the header
    And the central canvas area expands to use the additional space
    And the collapse icon changes to an expand icon
    When I click the expand icon
    Then the scene view panel expands back to its previous width
    And the canvas area adjusts accordingly

  Scenario: Context-sensitive property panel adaptation
    Given I have a hex map open in the canvas
    And the property panel is visible
    When I select a terrain hex
    Then the property panel shows terrain-specific controls
    And the panel header displays "Terrain Properties"
    When I select a text label element
    Then the property panel adapts to show text formatting controls
    And the panel header displays "Text Properties"
    When I deselect all elements
    Then the property panel shows map-level settings
    And the panel header displays "Map Properties"

  Scenario: Multi-document tab management for complex projects
    Given I have one map open named "Forbidden Swamp"
    When I open a second map named "Ancient Ruins"
    Then a new tab appears in the canvas area
    And the "Ancient Ruins" tab is active
    And the "Forbidden Swamp" tab remains accessible
    When I click the "Forbidden Swamp" tab
    Then the canvas switches to show the swamp map
    And the active tab indicator moves to "Forbidden Swamp"
    When I middle-click the "Ancient Ruins" tab
    Then the "Ancient Ruins" tab closes
    And the "Forbidden Swamp" map remains active

  Scenario: Keyboard shortcuts for power user efficiency
    Given I am focused on the canvas area
    When I press "Ctrl+1"
    Then the scene view panel toggles visibility
    When I press "Ctrl+2" 
    Then the property panel toggles visibility
    When I press "Ctrl+T"
    Then a new map tab opens
    When I press "Ctrl+W"
    Then the current map tab closes
    When I press "Ctrl+Tab"
    Then the next map tab becomes active

  Scenario: Professional status bar contextual information
    Given I am working on a hex map
    When I hover over a hex at coordinates 5,3
    Then the status bar shows "Hex 5,3 - Terrain: Forest"
    When I select multiple hexes
    Then the status bar shows "3 hexes selected"
    When I start editing a text element
    Then the status bar shows "Text editing mode - ESC to finish"
    When the system saves the map
    Then the status bar briefly shows "Map saved" confirmation

  Scenario: Elegant panel animation and responsive behavior
    Given the application window is maximized on a large screen
    When I collapse the scene view panel
    Then the panel animates smoothly over 200ms
    And the canvas area smoothly expands to fill the space
    When the window width drops below 1400px
    Then the property panel automatically collapses to icons only
    And a tooltip appears explaining the auto-collapse behavior
    When the window width increases above 1400px again
    Then the property panel expands back to its previous state

  Scenario: Scene view hierarchy navigation for complex maps
    Given I have a map with multiple layers and grouped elements
    When I expand a layer group in the scene view
    Then the child elements are revealed with proper indentation
    And expand/collapse icons show the hierarchy state
    When I click on a hex element in the scene view
    Then the corresponding hex is highlighted in the canvas
    And the property panel shows that hex's properties
    When I drag a hex element to a different layer in the scene view
    Then the hex visually moves to the new layer in both panels
    And the change is reflected immediately in the canvas

  Scenario: Professional toolbar integration with header
    Given the header contains the integrated toolbar
    When I select the hex terrain tool
    Then the cursor changes to indicate terrain painting mode
    And the property panel shows terrain brush settings
    When I select the text tool
    Then the cursor changes to a text insertion cursor
    And the property panel shows text formatting options
    When I press "Escape"
    Then the selection tool becomes active
    And the property panel returns to selection-based content