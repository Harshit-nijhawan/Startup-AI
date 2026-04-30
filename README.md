<div align="center">

# 🚀 Startup AI Simulator

### *Validate your startup idea in seconds with a 5-agent AI pipeline*

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Groq](https://img.shields.io/badge/AI-Groq_LLaMA_3.1-F55036?style=for-the-badge&logo=meta&logoColor=white)](https://groq.com)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 📖 Overview

**Startup AI Simulator** is a full-stack SaaS application that uses a **5-agent AI pipeline** powered by Groq's LLaMA 3.1 to analyze any startup idea. Enter your idea and budget — and within seconds, the agents collaboratively produce deep market research, a complete business plan, risk critique, confidence scoring, and even an improved plan based on the critique.

Built for founders, students, and product managers who want instant, data-driven validation before spending months on an idea.

---

## ✨ Features

- 🔍 **Market Research Agent** — Analyzes market demand, competitors, trends, and opportunities
- 📈 **Planner Agent** — Generates a full business plan with target market, features, and INR cost estimate
- ⚠️ **Critic Agent** — Identifies risks, weaknesses, and actionable improvements
- 🎯 **Scoring Agent** — Rates your startup's success probability from 0–100
- 🚀 **Improvement Agent** — Rewrites the plan using critique feedback for a stronger version
- 🔐 **JWT Authentication** — Secure signup/login with bcrypt-hashed passwords
- 📚 **Analysis History** — Browse, revisit, and delete all past analyses
- 💱 **INR Budget Support** — All cost estimates in Indian Rupees (₹)
- 🌙 **Dark / Light Mode** — Smooth theme toggle with persisted preference
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React + Vite Frontend                │
│  Login/Signup → Dashboard → InputForm → ResultsSection  │
│              HistorySidebar + AgentFlow                 │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP / REST API
┌─────────────────────▼───────────────────────────────────┐
│                   FastAPI Backend                       │
│   /signup  /login  /analyze  /improve  /history        │
└──────────┬──────────────────────────────────────────────┘
           │ Groq SDK (LLaMA 3.1-8b-instant)
┌──────────▼──────────────────────────────────────────────┐
│               5-Agent AI Pipeline                       │
│                                                         │
│  [Research] → [Planner] → [Critic] → [Scorer]          │
│                    ↓                                    │
│              [Improvement] (on demand)                  │
└──────────┬──────────────────────────────────────────────┘
           │ SQLAlchemy ORM
┌──────────▼──────────────────────────────────────────────┐
│               SQLite / PostgreSQL Database              │
│            users table + analyses table                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🤖 The 5 AI Agents

| Agent | Role | Output |
|---|---|---|
| `research_agent` | Market analyst | `market_demand`, `competitors`, `trends`, `opportunities` |
| `planner_agent` | Business strategist | `summary`, `target_market`, `features`, `cost_estimate` |
| `critic_agent` | Startup critic | `risks`, `weaknesses`, `improvements` |
| `scoring_agent` | Success evaluator | `score` (0-100), `reasoning` |
| `improve_agent` | Plan optimizer | Revised `summary`, `target_market`, `features`, `cost_estimate` |

All agents run on **Groq's `llama-3.1-8b-instant`** — ultra-fast inference at zero cost.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **SQLAlchemy** | ORM for database operations |
| **SQLite** (dev) / **PostgreSQL** (prod) | Data persistence |
| **Groq SDK** | LLaMA 3.1 AI inference |
| **python-jose** | JWT token generation & validation |
| **bcrypt** | Password hashing |
| **Pydantic** | Request/response schema validation |
| **Uvicorn** | ASGI server |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |
| **React Router v7** | Client-side routing |

---

## 📁 Project Structure

```
Startup-AI/
├── app/                        # FastAPI backend
│   ├── agents/                 # 5 AI agent modules
│   │   ├── research_agent.py
│   │   ├── planner_agent.py
│   │   ├── critic_agent.py
│   │   ├── scoring_agent.py
│   │   └── improve_agent.py
│   ├── api/routes/             # API endpoints
│   │   ├── auth.py             # /signup, /login
│   │   ├── analysis.py         # /analyze
│   │   ├── improve.py          # /improve
│   │   └── history.py          # /history
│   ├── core/
│   │   ├── ai.py               # Groq client setup
│   │   ├── config.py           # App settings & env vars
│   │   └── security.py         # JWT utilities
│   ├── db/
│   │   ├── models.py           # SQLAlchemy models
│   │   ├── crud.py             # Database operations
│   │   └── database.py         # DB connection & session
│   ├── schemas/                # Pydantic request/response models
│   ├── services/               # Business logic layer
│   └── main.py                 # FastAPI app entry point
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── api/                # Axios API calls
│   │   ├── components/         # UI components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── ResultsSection.jsx
│   │   │   ├── HistorySidebar.jsx
│   │   │   ├── AgentFlow.jsx
│   │   │   ├── ConfidenceScore.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/            # React context (auth, theme)
│   │   ├── hooks/              # Custom hooks
│   │   ├── pages/              # Login & Signup pages
│   │   └── App.jsx
│   └── package.json
│
├── requirements.txt
├── .env.example                # Environment variable template
├── run_backend.bat             # Windows: start backend
├── run_frontend.bat            # Windows: start frontend
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- A free [Groq API key](https://console.groq.com)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/startup-ai.git
cd startup-ai
```

### 2. Setup the Backend
```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Create your environment file
cp .env.example .env
# Edit .env and add your GROQ_API_KEY and SECRET_KEY
```

### 3. Setup the Frontend
```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

Edit the `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_strong_random_secret_key
DATABASE_URL=                          # Leave empty for local SQLite
```

> Get your free Groq API key at [console.groq.com](https://console.groq.com) — no credit card required.

### 5. Run the Application

**Backend** (from project root):
```bash
.venv\Scripts\python.exe -m uvicorn app.main:app --reload
# API runs at: http://localhost:8000
# Docs at:     http://localhost:8000/docs
```

**Frontend** (from `frontend/` directory):
```bash
npm run dev
# App runs at: http://localhost:5173
```

> **Windows users:** Double-click `run_backend.bat` and `run_frontend.bat` to start both with one click.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register new user, returns JWT |
| `POST` | `/login` | ❌ | Login, returns JWT |
| `POST` | `/analyze` | ✅ | Run full 5-agent analysis |
| `POST` | `/improve` | ✅ | Improve plan using critique |
| `GET` | `/history` | ✅ | Get all past analyses |
| `GET` | `/history/{id}` | ✅ | Get specific analysis |
| `DELETE` | `/history/{id}` | ✅ | Delete an analysis |
| `GET` | `/` | ❌ | Health check |
| `GET` | `/docs` | ❌ | Interactive API docs (Swagger) |

---

## 🌍 Free Deployment

| Service | Hosts | Cost |
|---|---|---|
| [**Render.com**](https://render.com) | FastAPI Backend | Free |
| [**Vercel.com**](https://vercel.com) | React Frontend | Free |
| [**Neon.tech**](https://neon.tech) | PostgreSQL Database | Free |
| [**Groq**](https://console.groq.com) | AI Inference | Free |

> See the full deployment guide in the project for step-by-step instructions.

---

## 📸 Screenshots

> *Coming soon — deploy and add your live app screenshots here!*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ using FastAPI, React, and Groq AI.

---

<div align="center">

⭐ **If this project helped you, consider giving it a star!** ⭐

</div>
