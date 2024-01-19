import React from 'react'
import { Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BackIcon, earth } from '../assets/img'

/* 

  Component:  Back Button
  Function: - a beautiful button to go to the homepage

 */
export default function BackButton({ justAButton}) {
    const navigate = useNavigate();
  return (
    <div className='d-flex align-items-center' style={justAButton ? styles.justAButton : styles.container} onClick={() => navigate("/")}> <BackIcon height={18} /><Image height={24} src={earth} /></div>
  )
}

const styles = {
    container: {
        position: "relative",
        top: "24px",
        left: "24px",
        cursor: "pointer",
        width: "fit-content"
    },
    justAButton: {
      cursor: "pointer",
      width: "fit-content",
    }
}