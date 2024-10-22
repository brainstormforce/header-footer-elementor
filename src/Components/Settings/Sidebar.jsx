import React, { useState } from 'react'

const Sidebar = ({ items, onSelectItem }) => {
  const [selectedItemId, setSelectedItemId] = useState(null); // State to track selected item

  const handleSelectItem = (item) => {
    setSelectedItemId(item.id); // Update selected item
    onSelectItem(item); // Trigger onSelectItem callback
  };

  return (
    <div className="p-4">
      {/* Loop through items to render main title, icon, and title */}
      {items.map((item) => (
        <div key={item.id} className="mb-6">
          {/* Main Title for each section */}
          <p className="text-sm text-text-tertiary font-normal mb-2">{item.main}</p>
          
          {/* Each item with icon and title */}
          <div
            className={`h-10 w-56 flex items-center justify-start gap-2 cursor-pointer p-1 ${
              selectedItemId === item.id ? 'bg-gray-100' : 'bg-background-primary'
            }`}
            style={{
              backgroundColor: selectedItemId === item.id ? '#F9FAFB' : '', // Apply background color when selected
            }}
            onClick={() => handleSelectItem(item)}
          >
            <span className="">{item.icon}</span>
            <p className="m-0 text-base font-normal">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
