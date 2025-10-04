import { Paper, Typography } from "@mui/material";

const IdeaResult = ({ result }) => {
  if (!result) return null;

  return (
    <Paper
      elevation={3}
      sx={{ p: 4, mt: 4, maxWidth: 600, mx: "auto", whiteSpace: "pre-line" }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        💡 Generated Ideas:
      </Typography>
      <Typography variant="body1">{result}</Typography>
    </Paper>
  );
};

export default IdeaResult;
