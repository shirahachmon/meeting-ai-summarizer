
    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import multer from "multer";
    import path from "path";
    import { fileURLToPath } from "url";
    import { ChatOpenAI } from "@langchain/openai";

    dotenv.config();
    const app = express();
    const upload = multer();
    app.use(cors());
    app.use(express.json({ limit: "10mb" }));

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "public")));

    const llm = new ChatOpenAI({ apiKey: process.env.OPENAI_API_KEY, model: "gpt-4o-mini" });

    app.post("/api/summarize", upload.single("transcript"), async (req, res) => {
      try {
        let text = req.body.text || "";
        if (req.file) {
          text = req.file.buffer.toString("utf8");
        }
        if (!text || !text.trim()) {
          return res.status(400).json({ error: "No transcript text provided." });
        }
        const prompt = `You are a meeting assistant. Produce STRICT JSON with keys: summary (array of strings), decisions (array), action_items (array of objects with task, owner, due), risks (array).
Text:
${text}`;
        const resp = await llm.invoke([{ role: "user", content: prompt }]);
        let parsed;
        try { parsed = JSON.parse(resp.content); }
        catch { parsed = { raw: resp.content }; }
        res.json(parsed);
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message || "Summarization failed." });
      }
    });

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => console.log(`Meeting-AI server running on http://localhost:${PORT}`));
