import React from "react";
import { useNavigate } from "react-router-dom";

/* 

  Component:  Chip Navigation
  Function: - navigation menu to navigate between the different screens

 */
export default function ChipNavigation({ setSelected }) {
  const navigate = useNavigate();

  const Chip = ({ text, path }) => {
    const selected = setSelected === text;

    const styles = {
      chip: {
        border: "solid 1px #2381a1",
        color: selected ? "white" : "#2381a1",
        backgroundColor: selected ? "#2381a1" : "white",
        cursor: "pointer",
      },
    };

    return (
      <button
        className="rounded-pill py-2 px-4 text-center fw-bold"
        style={styles.chip}
        onClick={() => navigate("/" + path)}
      >
        {text}
      </button>
    );
  };

  return (
    <div className="container-fluid m-0 p-0 d-flex justify-content-center" style={styles.scrollContainer}>
    <div className="d-flex flex-nowrap overflow-auto gap-2 p-3">
      <Chip text="Impact" path="dashboard" />
      <Chip text="Rewards" path="rewards" />
      <Chip text="Projects" path="projects" />
    </div>
    </div>
  );
}

const styles = {
    scrollContainer: {
        width: "100vw",
    }
}
