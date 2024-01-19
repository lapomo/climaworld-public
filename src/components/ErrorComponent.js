import React from 'react'
import { Accordion, Alert } from 'react-bootstrap';

import "./ErrorComponent.css"

export default function ErrorComponent({error}) {
    return (
        <Alert
          className="mt-3 mx-3 text-start p-1"
          variant="light"
          // style={{ maxWidth: "100%" }}
        >
          <div className='p-3'>
                There was an error. Please contact us through the chat support.
              </div>
          {/* <Accordion>
            <Accordion.Header className="apicall-error">
              <div className='p-3'>
                There was an error. Please contact us through the chat support.
              </div>
            </Accordion.Header>
            <Accordion.Body>{JSON.stringify(error)}</Accordion.Body>
          </Accordion> */}
        </Alert>
      );
}
