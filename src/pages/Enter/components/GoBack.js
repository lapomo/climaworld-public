import React from 'react'
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, earth } from '../../../assets/img';
import { useAppContext } from '../../../contexts/AppContext';

export default function GoBack({to}) {
    const app = useAppContext()
    const navigate = useNavigate()
  return (
    <div
        className="pt-4" // position-absolute top-0 
        style={{ cursor: "pointer" }}
        onClick={() => {
          to && (to === "/" ? navigate(to) : app.setEntryTempStorage({ ...app.entryTempStorage, enterPage: to}));
        }}
      >
        <ArrowLeft fill="white" /> {to === "/" ? <Image height={24} src={earth} /> : " go back"}
      </div>
  )
}
