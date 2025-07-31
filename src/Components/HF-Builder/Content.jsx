import React from 'react'

const Content = ({ selectedItem }) => {
  return (
    <div className="" style={{ padding: "50px"}}>
      <div>{selectedItem?.content}</div>
    </div>
  )
}

export default Content