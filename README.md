# Medication Timeline (Birth Model Take-home)

## Overview

This project implements a simple full-stack application that displays a patient’s medication history over time. The goal is to model and visualize real-world medication data, including overlaps, dose changes, and conflicting records from multiple sources.

The app focuses on clarity, correctness, and realistic assumptions.

## Live Demo
- **Frontend**: https://birth-model-medtimeline.vercel.app/
- **Backend API**: https://birth-model-medtimeline.onrender.com/api/medtimeline/patients/patient_001/

Test data is pre-seeded for `patient_001`.


## What I Built

### Backend
- **Framework**: Django + Django REST Framework, SQLite
- **Core model**: `Medication`
- **API endpoint**: 
   - `GET /api/medtimeline/patients/<patient_id>/`
   - Returns all medications for a given patient, sorted by start date
- **Data seeding**:
    - Seeded realistic medication records for a single patient
    - Includes overlapping medications, duplicate drugs from different sources, dose changes, and missing end dates
    - Seeding runs once via a data migration to avoid duplication
    - Seed data is applied to deployment via a Django data migration 

### Frontend
- **Framework**: React(JavaScript)
- **UI**:
    - Timeline view of medications across months
    - Each medication rendered as a horizontal bar spanning its active date range
    - Visual grouping by medication name
    - Conflict indicators when multiple records exist for the same medication
- **Features**:
    - Handles overlapping timelines cleanly
    - Handles ongoing medications (no end date)
    - Highlights “today” on the timeline
    - Allows zooming by time range (e.g. 1M / 3M / 6M / 1Y)

## Key Assumptions

Because the problem statement intentionally mirrors messy real-world data, I made the following assumptions:

1. **Single patient focus**
    - The system is scoped to one patient at a time.
    - Patient identity is represented by a simple `patient_id` string rather than a full Patient table.

2. **Medication records are append-only**
    - Records are not deduplicated or merged at write time.
    - Conflicting records are preserved to reflect real EHR integrations.

3. **Conflicts are informational, not errors**
    - Overlapping records for the same medication are allowed.
    - The UI flags these as “record conflicts” instead of attempting automatic resolution.

4. **Dates drive the timeline**
    - `start_date` is required.
    - `end_date = null` means the medication is ongoing.


## How Conflicts Are Handled

Conflicts arise when:
- The same medication appears multiple times
- Records overlap in time
- Data comes from different sources (e.g. Hospital A vs Hospital B)
- Dosage increases

### Backend
- All records are returned as-is.
- No automatic reconciliation or suppression of duplicates.
- This keeps the API simple and transparent.

### Frontend
- Medications with multiple records are visually grouped.
- A **“record conflict” indicator** is shown when more than one record exists for the same medication.
- Overlapping bars make differences in duration and dosing visible.
- Dose changes are visually distinguished using lighter and darker color variations.
- Partially handled incomplete date information, when an `end_date` is null, considered it as ongoing.

### Same medication from two different facilities

![alt text](<images/Side_Drawer_Record_Conflict.png>)

### Dose changes over time

![alt text](<images/Dose_Change.png>)

### Conflicting Records

![alt text](<images/Record_Conflict.png>)

### Missing/incomplete date information

![alt text](<images/Ongoing_Indication.png>)

This approach favors explainability over hidden logic, which is important in clinical contexts.


## Data Model

### Medication

| Field | Description |
|------|------------|
| `patient_id` | External patient identifier |
| `medication_name` | Name of the medication |
| `dose` | Dose as documented |
| `frequency` | Dosing frequency |
| `route` | Route of usage |
| `start_date` | Medication start date |
| `end_date` | Medication end date (nullable) |
| `source` | Originating system or facility |
| `reason` | Clinical reason (optional) |
| `notes` | Free-text notes |
| `last_updated_at` | Auto-updated timestamp |


## Why This Design

- **Simple backend**: Keeps logic readable and avoids over-engineering.
- **Frontend-driven interpretation**: Conflicts are best understood visually.
- **Realistic data modeling**: Reflects how clinical data actually looks when aggregated from multiple systems.
- Including a `last_updated_at` field allows the system to capture data freshness, which is critical in clinical contexts where multiple systems may update the same medication record at different times.

### UI Tradeoffs

**What I chose to show prominently:**
- Date ranges as horizontal bars (makes timeline intuitive)
- Conflict indicators
- Medication grouping

**What I chose to minimize:**
- Detailed record metadata (dose, frequency, route) shown only in drawer on click or on hover
- Source system information (shown on hover to reduce clutter)

These decisions prioritize clarity and scanability over comprehensive detail at first glance.

## What I Would Improve With More Time

### Infrastructure & Data Model
1. Replace SQLite with PostgreSQL to support concurrent writes and enable more advanced querying and indexing.
2. Add a dedicated `Patient` table with foreign-key relationships to scale beyond a single patient view.
3. Add audit history and versioning for medication changes to track dose adjustments, discontinuations, and corrections across sources.

### User Experience & Features
4. Surface `last_updated_at` and clinical notes more clearly in the UI via hover states or a details panel to help clinicians assess data freshness and understand clinical context.
5. Add a patient list view to enable navigation across multiple patients.
6. Add filtering by medication name, date range, source system, or active vs completed medications.
7. Add tooltips or a side panel showing detailed record differences for overlapping medications.

### Quality & Polish
8. Add tests for API responses and timeline rendering, especially around edge cases.
9. Add proper error handling for empty states, network failures, and malformed records.


## Challenges & What Was Tricky

**Handling Null End Dates**
- Deciding how to represent ongoing medications was trickier than expected. 
- Simply rendering them as "active forever" made the timeline extend indefinitely, but treating null as "unknown" lost important clinical information.
- *Solution*: Extended ongoing medications to "today". This preserves the clinical meaning while keeping the timeline bounded.

**Data Seeding in Production**
- Ensuring seed data deployed correctly to Render without duplicating on every push took some iteration. 
- Django migrations run automatically, but I needed idempotent seeding.
- *Solution*: Used a data migration with checks to prevent duplicate records if the migration runs multiple times.


## How to Run Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Development 

### Time Spent

This project took approximately **12 hours** over 3 days:
- Planning & Backend setup: ~2-3 hours
- Frontend timeline implementation: ~3 hours
- Edge case handling and testing: ~3 hours
- Deployment and documentation: ~3 hours

### AI Tools Used

Used ChatGPT and Claude for:
- Brainstorming ideas for edge case handling 
- Assisting with debugging and few code errors

All architectural decisions, data modeling, edge-case handling, and final implementation choices were made manually. The UI behavior, conflict handling, and timeline logic were designed intentionally to reflect real-world clinical data complexity.

