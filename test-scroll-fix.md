# Scroll Fix Implementation

## Changes Made:

1. **Added new refs for tracking elements:**
   - `conditionsContainerRef`: References the conditions container
   - `userRolesContainerRef`: References the user roles container  
   - `lastAddedConditionRef`: References the last added condition element
   - `lastAddedUserRoleRef`: References the last added user role element

2. **Updated handleAddCondition function:**
   - Added setTimeout with 100ms delay to allow DOM update
   - Scrolls to the newly added condition using `scrollIntoView` with smooth behavior
   - Centers the element in the viewport

3. **Updated handleAddUserRole function:**
   - Added setTimeout with 100ms delay to allow DOM update
   - Scrolls to the newly added user role using `scrollIntoView` with smooth behavior
   - Centers the element in the viewport

4. **Added refs to DOM elements:**
   - Conditions container has `conditionsContainerRef`
   - Last condition element gets `lastAddedConditionRef`
   - User roles container has `userRolesContainerRef`
   - Last user role element gets `lastAddedUserRoleRef`

## How it works:

When a user clicks "Add Condition" or "Add User Role":
1. The new element is added to the state
2. After 100ms (allowing React to update the DOM), the scroll function executes
3. The newly added element smoothly scrolls into view and centers in the viewport
4. This prevents the scroll from resetting to the top of the dialog

## Testing:

1. Open the display conditions dialog
2. Add multiple display conditions (5-6)
3. Verify scroll moves to the newly added condition
4. Add multiple user roles (5-6) 
5. Verify scroll moves to the newly added user role
6. Confirm no scroll reset to top occurs
