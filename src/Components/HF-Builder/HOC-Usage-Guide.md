# Display Conditions HOC Usage Guide

## Overview

The `withDisplayConditions` Higher-Order Component (HOC) provides reusable display conditions dialog functionality that can be used across multiple components in your application.

## Files Created

1. **DisplayConditionsDialog.jsx** - The HOC that provides display conditions functionality
2. **AllLayouts.jsx** - Refactored to use the HOC
3. **Header.jsx** - Example implementation using the HOC
4. **Footer.jsx** - Example implementation using the HOC
5. **CustomBlock.jsx** - Example implementation using the HOC

## How to Use the HOC

### 1. Import the HOC

```jsx
import withDisplayConditions from "./DisplayConditionsDialog";
```

### 2. Wrap Your Component

```jsx
const YourComponent = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {
  // Your component logic here
  
  return (
    <>
      {/* Your component JSX */}
      
      {/* Render the Display Conditions Dialog from HOC */}
      <DisplayConditionsDialog />
    </>
  );
};

export default withDisplayConditions(YourComponent);
```

### 3. Use the Provided Props

The HOC provides these props to your component:

- **`openDisplayConditionsDialog(item)`** - Function to open the dialog with an item
- **`DisplayConditionsDialog`** - React component to render the dialog
- **`isDialogOpen`** - Boolean state of dialog visibility
- **`setIsDialogOpen`** - Function to control dialog visibility

### 4. Handle Item Creation/Editing

```jsx
const handleCreateLayout = (item) => {
  if (!item.id) {
    // Create new layout logic here
    apiFetch({
      path: "/hfe/v1/create-layout",
      method: "POST",
      data: {
        title: "My Custom Layout",
        type: item.name,
      },
    })
    .then((response) => {
      if (response.success && response.post_id) {
        const updatedItem = { ...item, id: response.post_id };
        openDisplayConditionsDialog(updatedItem);
      }
    });
  } else {
    // Edit existing layout
    openDisplayConditionsDialog(item);
  }
};
```

## Features Provided by the HOC

### 1. State Management
- Manages dialog open/close state
- Handles conditions array with add/remove functionality
- Manages loading and error states
- Fetches and caches location options

### 2. API Integration
- Fetches target rule options on mount
- Loads existing conditions for items with IDs
- Saves conditions to the backend
- Handles API errors gracefully

### 3. Condition Management
- Add new conditions
- Remove existing conditions
- Update condition types (Include/Exclude)
- Update display locations
- Maintains unique IDs for conditions

### 4. User Interface
- Complete dialog with header, body, and footer
- Loading states with spinners
- Error message display
- Responsive design
- Accessible controls

## Customization Options

### 1. Callback Props
You can pass additional props to customize behavior:

```jsx
<YourComponent 
  onConditionsSaved={(item, conditions) => {
    // Custom callback when conditions are saved
    console.log('Conditions saved for:', item, conditions);
  }}
/>
```

### 2. Custom Item Structure
Items passed to `openDisplayConditionsDialog` should have this structure:

```jsx
const item = {
  id: "optional-existing-id", // If editing existing item
  name: "Item Name",
  image: "path/to/image.jpg",
  buttonText: "Button Text",
  onClick: () => {
    // Custom action after saving conditions
  }
};
```

## Example Implementation

Here's a complete example of how to use the HOC:

```jsx
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import withDisplayConditions from "./DisplayConditionsDialog";

const MyComponent = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {
  const items = [
    {
      id: "",
      name: "My Layout",
      image: "/path/to/image.jpg",
      buttonText: __("Create Layout", "header-footer-elementor"),
      onClick: () => window.open("/edit-url", "_blank"),
    },
  ];

  const handleCreateItem = (item) => {
    // Your creation logic here
    openDisplayConditionsDialog(item);
  };

  return (
    <>
      <div className="my-component">
        {items.map((item) => (
          <div key={item.name}>
            <Button onClick={() => handleCreateItem(item)}>
              {item.buttonText}
            </Button>
          </div>
        ))}
      </div>

      {/* Render the Display Conditions Dialog from HOC */}
      <DisplayConditionsDialog />
    </>
  );
};

export default withDisplayConditions(MyComponent);
```

## Benefits of Using the HOC

1. **Code Reusability** - Same dialog logic across multiple components
2. **Consistency** - Uniform behavior and appearance
3. **Maintainability** - Single source of truth for dialog functionality
4. **Separation of Concerns** - Dialog logic separated from component logic
5. **Easy Testing** - Can test dialog functionality independently
6. **Performance** - Shared state management and API calls

## Migration from Original Code

If you have existing components with embedded dialog code:

1. Remove dialog-related imports (`Dialog`, `X` icon)
2. Remove dialog state variables
3. Remove dialog-related functions
4. Import and wrap with the HOC
5. Use provided props instead of local state
6. Add `<DisplayConditionsDialog />` to your JSX

This HOC approach makes your codebase more modular, maintainable, and follows React best practices for component composition.
