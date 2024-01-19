import React from 'react'
import { Image } from 'react-bootstrap'
import { wave, Wavefromtop } from '../assets'

import "./WaveDown.css"

export default function WaveDown() {
  return (
    // <div className='waveup-container reverse'></div>
    <Image src={wave} style={{transform: "scaleY(-1)", overflow: "clip"}} />
  )
}
