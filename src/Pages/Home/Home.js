import { Button, MenuItem, TextField } from "@mui/material"; // Ganti dari @material-ui/core
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ganti dari useHistory
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Categories from "../../Data/Categories";
import "./Home.css";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate(); // Gantikan useHistory

  const handleSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz"); // Ganti history.push() → navigate()
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span className="span"> Quiz Category</span>
        <div className="settings__select">
          {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
          <TextField
            style={{ marginBottom: 25 }}
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Level"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
          >
            Start
          </Button>
        </div>
      </div>
      <img src="/quiz1.jpg" className="banner" alt="quiz app" />
    </div>
  );
};

export default Home;
