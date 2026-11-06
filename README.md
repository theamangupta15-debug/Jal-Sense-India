# 💧 Jal Sense India (Nagpur Pilot)
> **Open Civic Water Intelligence, Aquifer Transparency & Municipal Accountability Platform**

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Ollama](https://img.shields.io/badge/Local_LLM-Ollama_(llama3.2:1b)-000000?style=flat&logo=ollama&logoColor=white)](https://ollama.com/)

Jal Sense India is an open-source civic technology platform developed to bridge the critical gap between official environmental datasets and citizen accessibility. Focusing on Nagpur District across 16 administrative sub-units, the platform organizes statutory public data streams—hydrogeological observations, drinking water standards, and regional reservoir levels—into an intuitive digital interface.

---

## 📸 Platform Interface Preview

<p align="center">
  <img src="docs/screenshots/HomePage.png" width="49%" alt="Home Overview" />
  <img src="docs/screenshots/ExplorePage.png" width="49%" alt="Explore " />
</p>
<p align="center">
  <img src="docs/screenshots/MapPage.png" width="49%" alt="Maharashtra Map" />
  <img src="docs/screenshots/AssistantPage.png" width="49%" alt="Ollama Assistant" />
</p>

---

## 🎯 The Civic Problem
In many administrative divisions, critical water metrics remain locked inside quarterly PDFs. Citizens regularly face:
1. **Ambiguity Around Water Safety:** Lack of public laboratory sample records is mistakenly conflated with certification of purity.
2. **Thermal Disinfection Misconceptions:** Widespread belief that boiling removes chemical ions (Fluoride, Nitrate, high TDS), whereas boiling only neutralizes biological pathogens.
3. **Barriers to Civic Reporting:** Opaque grievance processes requiring excessive KYC credentials.

---

## 🛠️ Core Capabilities & Architecture

- **Open Access Exploration:** Explore 16 Nagpur sub-units and verify parameters against Bureau of Indian Standards (BIS IS 10500:2012) without requiring an account.
- **Action-Gated Authentication:** Authentication triggered strictly for state-modifying actions (lodging a grievance), with distinct roles for Citizens and PHED Officials.
- **Hydrological vs. Potability Separation:** Static groundwater tables (CGWB) and laboratory water quality testing (BIS) are strictly demarcated.
- **Interactive Maharashtra Map:** Visualizes Central Ground Water Board (CGWB) aquifer table depths (mbgl) and WRD major reservoir capacities.
- **Multilingual Support:** Built with native language switching across English, हिंदी (Hindi), and मराठी (Marathi).
- **Local AI Civic Assistant:** Powered by an on-device LLM (`llama3.2:1b` via Ollama) with strict negative guardrails (Zero Hallucination, Thermal Honesty, Clinical Boundaries).

---

## 📂 Project Structure

```text
jal-sense-india/
├── docs/screenshots/           # Platform interface captures
├── src/
│   ├── assets/                 # Icons and static graphics
│   ├── components/             # Reusable UI elements
│   ├── context/                # Global state (Auth, UI, Locales)
│   ├── data/                   # Grounded civic benchmarks (CGWB, BIS)
│   ├── pages/                  # Application routes (Home, Map, Assistant)
│   └── utils/                  # Trilingual dictionary & helpers
└── package.json

## API and deployment configuration

The frontend resolves its backend URL from `VITE_API_BASE_URL`, then the legacy `VITE_API_URL`. If neither is set, production uses `https://jal-sense-india.onrender.com` and local development uses `http://localhost:5000`. Loopback URLs configured for a production build are ignored in favor of the Render default.

On Render, configure `NODE_ENV=production`, `MONGODB_URI`, and `ALLOWED_ORIGINS=https://jal-sense-india.vercel.app`. `PORT` is supplied by Render. Production startup requires `MONGODB_URI`; it will not silently connect to a local database.

Getting Started
1. Clone & Install

git clone [https://github.com/theamangupta15-debug/Jal-Sense-India.git](https://github.com/theamangupta15-debug/Jal-Sense-India.git)
cd Jal-Sense-India
npm install

2. Set Up Local Ollama Engine
Ensure Ollama is installed on your system, then pull the model:

Bash
ollama pull llama3.2:1b
Allow requests from your local Vite frontend:

Windows (PowerShell):

PowerShell
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', 'http://localhost:5173,[http://127.0.0.1:5173](http://127.0.0.1:5173)', 'User')
macOS / Linux:

Bash
OLLAMA_ORIGINS="http://localhost:5173" ollama serve
3. Run Development Server
Bash
npm run dev
⚖️ Civic & Medical Disclaimers
No Clinical Advice: Jal Sense India does not provide clinical diagnoses. In case of waterborne infections, report to the nearest Primary Health Centre (PHC).

Absence of Lab Data: Absence of municipal laboratory sample data does not certify that water is pure or safe for consumption.