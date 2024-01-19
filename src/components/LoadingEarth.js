import React from 'react'
import { Image } from 'react-bootstrap'
import { earth } from '../assets/img'

import "./LoadingEarth.css"

export default function LoadingEarth({animation = "jump", className, style}) {
    return (
      <div className={`${className} text-center`} style={style}>
        <Image className={`loading-earth-${animation}`} height={40} src={earth} />
      </div>
    )
}
