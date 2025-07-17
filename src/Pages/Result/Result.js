import { Button } from "@mui/material"; // Ganti dari @material-ui/core
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Ganti dari useHistory
import "./Result.css";

const Result = ({ name, score }) => {
  const navigate = useNavigate(); // Gantikan useHistory

  useEffect(() => {
    if (!name) {
      navigate("/"); // Ganti history.push("/")
    }
  }, [name, navigate]);

  return (
    <div className="result">
      <div className="Box">
        <h1>Name: {name}</h1>
        <br />
        <p>Score: {score}</p>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Result;
