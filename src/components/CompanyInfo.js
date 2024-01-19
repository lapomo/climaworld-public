import React from 'react'
import { useState } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap';
import company from '../assets/text/company';

/* 

  Component:  Company Info
  Function: - show company information (legal)

 */
export default forwardRef((props, ref) => {
    const [showCoInfo, setShowCoInfo] = useState();

    useImperativeHandle(ref, () => ({
        setShowCoInfo,
      }))

  return (
    <Modal show={showCoInfo} onHide={() => setShowCoInfo(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          <span className="mb-3">
            {company.legalName}
          </span>
          <div className='d-flex flex-column mb-3'>
          <span>{company.address.street}</span>
          <span>{company.address.city}</span>
          <span>{company.address.state + " " + company.address.postcode}</span>
          <span>{company.address.country}</span>
          </div>
          <span className="">
            <a href={`tel:${company.phone}`} style={{color:'inherit'}}>{company.phone}</a>
          </span>
          <span className='mb-3'>
            <a href={`mailto:${company.mail}`} style={{color:'inherit'}}>{company.mail}</a>
          </span>
        </Modal.Body>
      </Modal>
  )
});

const styles = {
    avatars: {
        // gap: "20px",
    },
    avatar: {
        height: "100px"
    }
}
