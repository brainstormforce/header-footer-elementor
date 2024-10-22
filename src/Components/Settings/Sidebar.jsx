import React from 'react'

const Sidebar = ({ items, onSelectItem }) => {
  return (
    <div className="bg-gray-100 p-4">
      {/* Loop through items to render main title, icon, and title */}
      {items.map((item) => (
        <div key={item.id} className="mb-6">
          {/* Main Title for each section */}
          <p className="text-sm font-normal mb-2">{item.main}</p>
          
          {/* Each item with icon and title */}
          <div
            className=" p-1 bg-background-primary"
            onClick={() => onSelectItem(item)}
          >
            <span className="mr-2">{item.icon}</span>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
