import React from 'react'
import { Image } from 'react-bootstrap'
import { wave } from '../assets'

import "./WaveDown.css"

export default function WaveUp() {
  return (
    // <div className='waveup-container'></div>
    <Image src={wave} style={{overflow: "clip"}} />
  )
}
