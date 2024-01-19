import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { cookieChameleon } from './assets'

export default function CookieBox({onCustomise, setCookieChoice}) {
  return (
    <div className="rounded" style={styles.popContainer}>
        <div style={styles.popContent}>
          {/* <div>Top</div> */}
          <div className='w-100 pb-3 text-center'><Image width={200} src={cookieChameleon} /></div>
          <div className="pb-3" style={styles.popText}>
            We use cookies to improve your experience, understand your usage and
            to personalize advertising as well as your experience based on your
            interests. We also use third-party cookies. By clicking “<a href="#" onClick={() => setCookieChoice("all")}>Accept</a>”, you consent to the use of these cookies. If you are under
            16 years old, please <a href="#" onClick={() => setCookieChoice("none")}>decline all cookies</a>. For more information see
            our <a href="/privacy">Cookie policy</a>.
          </div>
          <div className="d-flex flex-wrap" style={styles.popButtonContainer}>
            <div style={styles.popButtonWrapper}>
              <Button variant="outline" style={styles.popButton} onClick={onCustomise}>
                Settings
              </Button>
            </div>
            <div style={styles.popButtonWrapper}>
              <Button variant="primary" style={styles.popButton} onClick={() => setCookieChoice("all")}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
  )
}

const styles = {
    popContainer: {
        fontSize: "14px",
        margin: "0 30px 30px",
        backgroundColor: "#fff",
        width: "550px",
        // border: "solid .5px white"
      },
      popContent: {
        padding: "30px 30px",
      },
      popText: {},
      popButtonContainer: {
        margin: "0 -15px",
      },
      popButtonWrapper: {
        padding: "0 5px",
        flex: "0 0 50%",
        maxWidth: "50%",
      },
      popButton: {
        width: "100%",
        // backgroundColor: "black"
      },
}