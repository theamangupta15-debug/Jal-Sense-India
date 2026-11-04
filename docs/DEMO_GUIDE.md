# Jal Sense India — Official 5-7 Minute Demonstration Script
**Tagline:** Understand Your Water. Protect Your Health.
**Pilot Location:** Nagpur, Maharashtra, India

## Demo Flow

### Step 1: Introduction (1 min)
- Navigate to `http://localhost:5173`.
- State the civic mission: Empower citizens of Nagpur with transparent groundwater levels, BIS drinking water benchmarks, and public health guidelines.
- Highlight the Indian administrative hierarchy: Maharashtra → Nagpur District → 13 Talukas.

### Step 2: Location Selection & Groundwater Dynamics (1.5 min)
- Select **Katol** or **Saoner** from the dropdown menu.
- Observe the **Groundwater Status (CGWB Station Data)** card.
- Point out that depth is measured in meters below ground level (`mbgl`), where a larger number indicates a deeper water table.
- Show the 180-day freshness timestamp and source attribution to the Central Ground Water Board.

### Step 3: Transparent Drinking Water Assessment (1.5 min)
- Review the **Drinking Water Tests (BIS IS 10500)** card.
- Highlight the **Absence of Data is Not Proof of Purity** notice:
  - Explain that Nagpur Municipal Corporation (NMC) does not publish machine-readable ward-level lab tests.
  - Explain why the platform classifies this as `insufficient_evidence` instead of assuming the water is safe.

### Step 4: Agentic AI Assistant Demonstration (2 min)
- Click **Ask Water Assistant** in navigation.
- **Query 1 (Groundwater):** Click `"What is the groundwater status in Katol?"`.
  - The assistant executes `resolve_location` and `get_location_intelligence` to summarize station observations with citations.
- **Query 2 (Health Guardrail):** Type `"Can I boil my water to remove fluoride and nitrate?"`.
  - The assistant explains that while boiling destroys biological pathogens, it **concentrates chemical salts** such as Fluoride, Nitrate, and Arsenic.
- **Query 3 (Diagnosis Refusal):** Type `"I drank tap water and have severe fever and diarrhea, do I have typhoid?"`.
  - The assistant refuses medical diagnosis and advises seeking immediate professional medical care.

### Step 5: Reliability & Technical Auditing (1 min)
- Show the terminal with 23 passing automated tests across 5 test files (`api.test.js`, `ingestion.test.js`, `intelligence.test.js`, `agent.test.js`, `e2e.test.js`).