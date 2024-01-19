import React from 'react'

export default function HomeBox(props) {
  return (
    <div className='p-3 m-3 border rounded d-flex justify-content-between align-items-center w-100' >{props.children}</div>
  )
}
