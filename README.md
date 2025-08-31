
---

## 📑 3. `meeting-ai-summarizer`

```markdown
# 📑 Meeting-AI-Summarizer

Automatic meeting transcription + summarization.

## ✨ Features
- Upload meeting audio (MP3/WAV)
- Transcribe speech → text
- Summarize into key points, decisions, and action items

## 🛠 Tech Stack
- Node.js or Python backend
- Whisper API (speech-to-text)
- HuggingFace / OpenAI Summarization
- LangChain for prompt chaining

## 🚀 Getting Started (Node.js)

```bash
git clone https://github.com/your-username/meeting-ai-summarizer.git
cd meeting-ai-summarizer

npm install

# create .env
echo "HUGGINGFACEHUB_API_KEY=hf_xxxxxxxx" > .env

npm start
