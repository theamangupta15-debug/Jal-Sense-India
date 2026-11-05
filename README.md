Here is the complete, production-ready `README.md` for **Jal Sense India**.

It completely closes all code blocks, formats the screenshot gallery properly with Markdown tables, documents your **local Ollama architecture (`llama3.2:1b`)**, and details every feature, data standard, and local setup step.

---

### Replace your entire `README.md` with this:

```markdown
# 💧 Jal Sense India (Nagpur Pilot)
> **Open Civic Water Intelligence, Aquifer Transparency & Municipal Accountability Platform**

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Ollama](https://img.shields.io/badge/Local_LLM-Ollama_(llama3.2:1b)-000000?style=flat&logo=ollama&logoColor=white)](https://ollama.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)

Jal Sense India is an open-source civic technology platform developed to bridge the critical gap between official environmental datasets and citizen accessibility. Focusing on Nagpur District across 16 administrative sub-units and talukas, the platform organizes disparate statutory public data streams—hydrogeological observations, drinking water standards, regional reservoir levels, and public health guidance—into an intuitive, accessible, and action-oriented digital interface.

---

## 📸 Platform Interface Preview

| Home Overview | Explore Talukas |
| :---: | :---: |
| ![Jal Sense Home](./docs/screenshots/HomePage.png) | ![Explore Talukas](./docs/screenshots/ExplorePage.png) |

| Maharashtra Hydrological Map | Local Ollama AI Assistant |
| :---: | :---: |
| ![Maharashtra Map](./docs/screenshots/MapPage.png) | ![Jal Sense Assistant](./docs/screenshots/AssistantPage.png) |

---

## 🎯 The Civic Problem
In many administrative divisions across Maharashtra and India, critical water metrics remain locked away inside quarterly PDF bulletins, static gazettes, and fragmented portals. Citizens regularly face:
1. **Ambiguity Around Water Safety:** Lack of public laboratory sample records is often mistakenly conflated with certification of purity.
2. **Thermal Disinfection Misconceptions:** Widespread belief that boiling removes chemical ions (such as Fluoride, Nitrate, or high TDS), whereas thermal boiling only neutralizes biological pathogens and slightly concentrates dissolved chemicals through steam evaporation.
3. **Barriers to Civic Reporting:** Opaque municipal grievance processes requiring excessive KYC credentials just to inspect local data or report a pipeline breach.

---

## 🛠️ Core Capabilities & Architecture

- **Open Access Data Exploration (No Mandatory Login):** Citizens can freely explore all 16 Nagpur administrative sub-units, inspect monitoring well depths, and verify parameters against Bureau of Indian Standards (BIS IS 10500:2012) without requiring an account.
- **Action-Gated Authentication:** Authentication is triggered strictly for state-modifying actions (lodging a municipal grievance or submitting feedback for data provenance audits), featuring distinct roles for **Citizens** and **PHED / Municipal Officials**.
- **Hydrological vs. Potability Data Separation:** Enforces strict civic honesty rules: static groundwater tables (CGWB) and laboratory water quality testing (BIS) are strictly demarcated and never combined into misleading composite scores.
- **Interactive Maharashtra Hydrological Map:** Visualizes Central Ground Water Board (CGWB) aquifer table depths (mbgl) and Water Resources Department (WRD) major reservoir capacities across divisions with deep-dive focus on Vidarbha.
- **Municipal Grievance Redressal:** A structured reporting portal for pipeline bursts, sewage intrusion, illegal borewell drilling, and waterborne outbreaks, complete with ticket ID generation and 24x7 helpline escalation pathways.
- **Multilingual Support (EN / HI / MR):** Built with native language switching across English, हिंदी (Hindi), and मराठी (Marathi) to ensure accessibility across rural and urban demographics.
- **Local AI Civic Water Assistant (Ollama Engine):** Powered by an on-device local LLM (`llama3.2:1b` via Ollama) with strict negative guardrails:
  - **Zero Hallucination:** Explicitly clarifies missing data rather than inventing lab metrics.
  - **Thermal Honesty:** Emphasizes that boiling eliminates microbial pathogens but cannot remove dissolved chemical contaminants like Fluoride, Nitrate, or high TDS.
  - **Clinical Boundaries:** Directs citizens experiencing acute symptoms to Primary Health Centres (PHCs) or GMCH Nagpur while providing basic hydration (ORS) advice.
  - **Offline Resilience:** Built-in heuristic fallback engine ensuring continuous operation if the local Ollama instance is offline.

---

## 📂 Project Structure

```text
jal-sense-india/
├── docs/
│   └── screenshots/            # Platform interface captures
│       ├── AssistantPage.png
│       ├── ExplorePage.png
│       ├── HomePage.png
│       └── MapPage.png
├── public/
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/                 # Icons, badges, and static vector graphics
│   ├── components/             # Reusable UI components
│   │   ├── ProtectedRoute.jsx  # Guards complaint action routes
│   │   ├── StatCard.jsx        # Dashboard metric blocks
│   │   └── WaterTable.jsx      # BIS IS 10500 parameter comparison table
│   ├── context/                # Global state management
│   │   ├── AuthContext.jsx     # Citizen/Official session handling & localStorage
│   │   └── UIContext.jsx       # Light/Dark mode state and multilingual active locale
│   ├── data/                   # Grounded civic benchmarks and hydrogeological data
│   │   ├── locations.json      # 16 Nagpur sub-units, talukas, and CGWB well profiles
│   │   ├── standards.json      # BIS IS 10500 statutory thresholds (pH, TDS, F, NO3)
│   │   └── healthGuide.json    # Waterborne ailments, symptoms, and disinfection protocols
│   ├── pages/                  # Route views
│   │   ├── AboutPage.jsx       # Civic-tech mission, disclaimers, and project scope
│   │   ├── Assistant.jsx       # AI Water Assistant (Local Ollama llama3.2:1b integration)
│   │   ├── ComplaintPage.jsx   # Municipal grievance redressal form (Auth-gated)
│   │   ├── Explore.jsx         # Directory & search for all Nagpur administrative areas
│   │   ├── HealthPage.jsx      # Epidemiological guide & point-of-use disinfection rules
│   │   ├── Home.jsx            # District hero summary, quick-select & health banner
│   │   ├── LocationPage.jsx    # Deep-dive taluka report (Aquifer mbgl + BIS lab metrics)
│   │   ├── LoginPage.jsx       # Returning user authentication (Citizen vs. Official)
│   │   ├── MapPage.jsx         # Maharashtra regional capacity & reservoir level viewer
│   │   ├── MethodologyPage.jsx # Data provenance, CGWB hydrograph sources & limits
│   │   └── RegisterPage.jsx    # New citizen registration & taluka assignment
│   ├── utils/
│   │   └── translator.js       # Tri-lingual dictionary (EN, HI, MR) & DOM parser
│   ├── App.css                 # Clean overrides
│   ├── App.jsx                 # Central router, navbar controls, and layout shell
│   ├── index.css               # Design tokens, CSS variables, Light/Dark styling
│   └── main.jsx                # Application mounting root
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

```

---

## 🛠️ Technology Stack

### **Frontend Client**

* **Framework:** React 18+ (Hooks, Context API)
* **Build Tooling:** Vite
* **Routing:** React Router v6 (Dynamic route matching, protected routes)
* **Styling:** Modular theme-aware CSS Variables (`--bg-card`, `--text-main`, `--primary`, `--border-color`) supporting light and dark themes with zero heavy UI libraries
* **Localization:** Trilingual dictionary support for English, हिंदी, and मराठी

### **AI Assistant & Data Layer**

* **Local Inference:** [Ollama](https://ollama.com/) running `llama3.2:1b` locally on `http://localhost:11434`
* **Civic System Grounding:** Hydrogeological grounding and thermal honesty constraints passed into the model prompt
* **Offline Resilience:** Built-in heuristic fallback engine ensuring continuous operation without active LLM processes
* **Data Provenance:** Central Ground Water Board (CGWB) observation wells, BIS IS 10500:2012 drinking water standards, and Water Resources Department (WRD) Maharashtra reservoir metrics

---

## 📊 Grounded Statutory Benchmarks (BIS IS 10500:2012)

| Parameter | Acceptable Limit | Permissible Limit | Primary Risk Factors / Notes |
| --- | --- | --- | --- |
| **pH Value** | 6.5 – 8.5 | No Relaxation | Acidic water corrodes metal pipes; alkaline water causes scaling |
| **Total Dissolved Solids (TDS)** | 500 mg/L | 2000 mg/L | Palatability, gastrointestinal irritation, mineral scaling |
| **Fluoride ($F^-$)** | 1.0 mg/L | 1.5 mg/L | Dental fluorosis in children; skeletal fluorosis at elevated exposure |
| **Nitrate ($NO_3^-$)** | 45 mg/L | No Relaxation | Infantile methemoglobinemia (Blue Baby Syndrome) |
| **Total Coliform** | Zero MPN/100ml | Zero MPN/100ml | Indicator of fecal contamination and microbiological pathogens |

---

## 🚀 Getting Started

### 1. Prerequisites

* [Node.js](https://nodejs.org/) (v18.0 or later)
* [Git](https://git-scm.com/)
* [Ollama](https://ollama.com/) (for running the local on-device AI assistant)

### 2. Clone Repository

```bash
git clone [https://github.com/theamangupta15-debug/Jal-Sense-India.git](https://github.com/theamangupta15-debug/Jal-Sense-India.git)
cd Jal-Sense-India
npm install

```

### 3. Set Up Local Ollama Engine

Ensure Ollama is installed on your system, then pull the model:

```bash
ollama pull llama3.2:1b

```

Allow requests from your local Vite frontend:

* **Windows (PowerShell):**
```powershell
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', 'http://localhost:5173,[http://127.0.0.1:5173](http://127.0.0.1:5173)', 'User')

```


* **macOS / Linux:**
```bash
OLLAMA_ORIGINS="http://localhost:5173" ollama serve

```



### 4. Run Development Server

```bash
npm run dev

```

Open `http://localhost:5173` in your browser.

---

## ⚖️ Civic & Medical Disclaimers

1. **No Clinical Advice:** Jal Sense India is an informational civic technology tool and does not provide clinical diagnoses. In case of waterborne infections or dehydration, report to the nearest Primary Health Centre (PHC) or GMCH Nagpur.
2. **Absence of Lab Data:** Absence of municipal laboratory sample data for an administrative block does not certify that water is pure or safe for consumption.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```

---

### Step 2: Push to GitHub

Run these commands in Git Bash or PowerShell from your project root:

```bash
git add README.md docs/screenshots/
git commit -m "docs: complete overhaul of README with local Ollama architecture and clean screenshot gallery"
git push origin main

```

