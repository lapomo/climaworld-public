import React from "react";

/* 

  Component:  Single Input
  Function: - a styled single input element
  
 */
export default function SingleInput({
  type,
  placeholder,
  inputRef,
  error,
  handleEnter,
  elements,
}) {
  function onKeyUp(event) {
    if (event.key === "Enter") {
      handleEnter();
    }
  }

  return (
    <>
      <div
        className="shadow py-4 mt-4 d-flex flex-column justify-content-center align-items-center"
        style={styles.inputContainer}
      >
        <input
          className="w-75 p-2 my-1"
          style={styles.input}
          type={type}
          placeholder={placeholder}
          ref={inputRef}
          autoFocus
          onKeyUp={onKeyUp}
        />
        {error && (
          <span className="" style={styles.error}>
            {error}
          </span>
        )}
        {elements}
      </div>
    </>
  );
}
const styles = {
  inputContainer: {
    borderRadius: "20px",
  },
  input: {
    borderRadius: "10px",
    border: "solid grey",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
