# 💧 Jal Sense India (Nagpur Pilot)
> **Open Civic Water Intelligence, Aquifer Transparency & Municipal Accountability Platform**

Jal Sense India is an open-source civic technology platform developed to bridge the critical gap between official environmental datasets and citizen accessibility. Focusing on Nagpur District across 16 administrative sub-units and talukas, the platform organizes disparate public data streams—hydrogeological observations, drinking water statutory limits, regional reservoir levels, and public health guidance—into a clean, verifiable interface.

---

## 🎯 The Civic Problem
In many administrative divisions across India, essential water metrics remain buried inside quarterly PDFs, static state gazettes, and fragmented portals. Citizens frequently face:
1. **Ambiguity Around Water Safety:** Lack of laboratory sample records is often mistakenly conflated with certification of potability.
2. **Thermal Disinfection Misconceptions:** Widespread belief that boiling removes chemical ions (such as Fluoride, Nitrate, or high TDS), whereas thermal boiling only addresses biological pathogens.
3. **Barriers to Civic Reporting:** Opaque municipal grievance processes that require excessive KYC credentials just to inspect data or log a pipeline issue.

---

## 🛠️ Core Capabilities & Architecture

- **Open Access Data Exploration (No Mandatory Login):** Citizens can freely explore all 16 Nagpur talukas, inspect monitoring well depths, and verify parameters against Bureau of Indian Standards (BIS IS 10500:2012) without creating an account or logging in.
- **Action-Gated Authentication:** Authentication is triggered strictly for state-modifying actions (e.g., lodging a municipal grievance or submitting feedback for data provenance audits), with distinct role support for **Citizens** and **PHED / Municipal Officials**.
- **Hydrological vs. Potability Data Separation:** Enforces strict civic honesty rules: static groundwater tables (CGWB) and laboratory water quality testing (BIS) are strictly demarcated and never combined into misleading composite scores.
- **Municipal Grievance Redressal:** A structured reporting portal for pipeline bursts, sewage intrusion, illegal borewell drilling, and waterborne outbreaks, complete with ticket ID generation and 24x7 helpline escalation pathways.
- **Multilingual Support (EN / HI / MR):** Built with dynamic language switching across English, हिंदी (Hindi), and मराठी (Marathi) to ensure accessibility across rural and urban demographics.
- **Theme-Adaptive Civic UI:** Seamless light and slate-dark interface adhering to accessibility standards.
- **AI Water Safety Assistant (RAG Pipeline Ready):** An interactive assistant interface with strict negative guardrails (no hallucination of missing lab metrics, no medical diagnosis, and strict thermal honesty), scaffolded for future integration with the Grok API and local vector embeddings.

---

## 📊 Grounded Data Sources

Jal Sense India synthesizes data exclusively from official and statutory sources:
* **Central Ground Water Board (CGWB):** National Hydrograph Network observations (water table depths in mbgl).
* **Bureau of Indian Standards (BIS IS 10500:2012):** Acceptable and permissible drinking water limits for TDS, Fluoride, Nitrate, and pH.
* **Groundwater Surveys and Development Agency (GSDA, Maharashtra):** Watershed-level extraction stress categorization.
* **National Center for Disease Control (NCDC / IDSP) & WHO:** Epidemiological disease symptoms and point-of-use disinfection guidelines.

---

## 💻 Tech Stack

- **Frontend:** React, React Router v6
- **Styling:** Modular theme-aware CSS (Light / Dark mode via CSS variables)
- **State Management:** Custom React Contexts (`AuthContext`, `UIContext`) with persistent client-side storage
- **AI/LLM Architecture:** Grounded RAG scaffold (Targeted for Grok API integration)

## 📂 Project File Structure

```text
jal-sense-india/
├── public/
│   ├── favicon.ico
│   └── vite.svg
├── src/
│   ├── assets/                 # Icons, badges, and static vector graphics
│   ├── components/             # Reusable UI elements
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
│   │   ├── AssistantPage.jsx   # AI Water Assistant (Grok API RAG scaffold)
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
├── .env.example                # Example environment variables (API endpoints, keys)
├── .gitignore
├── index.html
├── package.json
└── vite.config.js