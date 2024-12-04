import React from 'react'

const Content = ({ selectedItem }) => {
  return (
    <div className="p-6" style={{ marginLeft: '4px' }}>
      <div>{selectedItem?.content}</div>
    </div>
  )
}

export default Content
