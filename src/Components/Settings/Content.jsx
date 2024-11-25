import React from 'react'
import ThemeSupport from './ThemeSupport'

const Content = ({ selectedItem }) => {
  return (
    <div className="w-3/4 p-6">
    {/* <h2 className="text-2xl font-bold mb-4">{selectedItem.title}</h2> */}
    <div>{selectedItem.content}</div>
    {/* <ThemeSupport/> */}
  </div>
  )
}

export default Content
