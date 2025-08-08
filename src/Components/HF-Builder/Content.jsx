import React from 'react'

const Content = ({ selectedItem }) => {
  return (
    <div className="" style={{ paddingLeft: "20px", paddingRight: "20px"}}>
      <div>{selectedItem?.content}</div>
    </div>
  )
}

export default Content