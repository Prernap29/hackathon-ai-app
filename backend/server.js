// import express from "express";
// import dotenv from "dotenv";
// import axios from "axios";
// import cors from "cors";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ Root route
// app.get("/", (req, res) => {
//   res.send("🚀 Backend is running...");
// });

// // ✅ AI Idea route
// app.post("/api/idea", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const response = await axios.post(
//       "https://api.cerebras.ai/v1/chat/completions",
//       {
//         model: "llama-3.1-70b",
//         messages: [{ role: "user", content: prompt }],
//         max_tokens: 200,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // ✅ Safe extraction without optional chaining
//     let ideaText = "No response received.";
//     if (
//       response.data &&
//       response.data.choices &&
//       response.data.choices.length > 0 &&
//       response.data.choices[0].message &&
//       response.data.choices[0].message.content
//     ) {
//       ideaText = response.data.choices[0].message.content;
//     }

//     res.json({ result: ideaText });
//   } catch (err) {
//     console.error(
//       "❌ Cerebras API Error:",
//       err.response && err.response.data ? err.response.data : err.message
//     );

//     res.status(500).json({
//       error:
//         (err.response &&
//           err.response.data &&
//           err.response.data.error &&
//           err.response.data.error.message) ||
//         err.message ||
//         "Internal Server Error",
//     });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// ✅ AI Idea Generation Route
app.post("/api/idea", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // ✅ Cerebras endpoint for text completions
    const response = await axios.post(
      "https://api.cerebras.ai/v1/completions",
      {
        model: "llama3.1-8b", // ✅ available in free tier
        prompt: prompt, // ✅ use simple prompt
        max_tokens: 200,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CEREBRAS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let ideaText = "No response received.";
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      ideaText = response.data.choices[0].text;
    }

    res.json({ result: ideaText });
  } catch (err) {
    console.error(
      "❌ Cerebras API Error:",
      err.response && err.response.data ? err.response.data : err.message
    );

    res.status(500).json({
      error:
        (err.response &&
          err.response.data &&
          err.response.data.error &&
          err.response.data.error.message) ||
        err.message ||
        "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
