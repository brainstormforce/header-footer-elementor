import React, { useState } from 'react'

const Sidebar = ({ items, onSelectItem }) => {
  const [selectedItemId, setSelectedItemId] = useState(null); // State to track selected item

  const handleSelectItem = (item) => {
    setSelectedItemId(item.id); // Update selected item
    onSelectItem(item); // Trigger onSelectItem callback
  };

  return (
    <div style={{ padding: "1rem", width: "100%" }}>
      {/* Loop through items to render main title, icon, and title */}
      {items.map((item) => (
        <div key={item.id} className="mb-2">
          {/* Main Title for each section */}
          {item.main && (
            <p className="text-sm text-text-tertiary font-normal mb-2">
              {item.main}
            </p>
          )}

          {/* Each item with icon and title */}
          <div
            className={`h-10 flex items-center justify-start gap-2 px-2 rounded-md cursor-pointer ${selectedItemId === item.id ? 'bg-gray-100' : 'bg-background-primary'}`}
            style={{
              backgroundColor: selectedItemId === item.id ? '#F9FAFB' : '', // Apply background color when selected
            }}
            onClick={() => handleSelectItem(item)}
          >
            <span>
              {selectedItemId === item.id ? item.selected : item.icon}
            </span>
            <p className="m-0 text-base font-normal">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
