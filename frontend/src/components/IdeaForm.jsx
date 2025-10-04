import { useState } from "react";
import axios from "axios";
import { TextField, Button, Paper } from "@mui/material";

const IdeaForm = ({ setResult }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/idea", {
        prompt,
      });
      setResult(data.result);
    } catch (err) {
      setResult("Error fetching idea. Please try again.");
    }
    setLoading(false);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mt: 6,
        maxWidth: 600,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <TextField
        label="Enter your prompt"
        multiline
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#000" }}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Generating..." : "Generate Idea"}
      </Button>
    </Paper>
  );
};

export default IdeaForm;
