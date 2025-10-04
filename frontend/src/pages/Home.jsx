import { useState } from "react";
import IdeaForm from "../components/IdeaForm";
import IdeaResult from "../components/IdeaResult";

const Home = () => {
  const [result, setResult] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "30px" }}>
      <IdeaForm setResult={setResult} />
      <IdeaResult result={result} />
    </div>
  );
};

export default Home;
