import React from 'react'
import { Modal } from 'react-bootstrap'
import { getProjectDescription } from '../../../utility/getProjects'

export default function ProjectPopUp({show, setProjectPopup}) {
  return (
    <Modal
        show={show}
        onHide={() => setProjectPopup(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{show.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <div className="w-100 position-relative mb-3 text-center">Image</div> */}
          {getProjectDescription(show?.slug)}
        </Modal.Body>
      </Modal>
  )
}
