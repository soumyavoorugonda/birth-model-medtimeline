from datetime import date
from .models import Medication

def seed_data():
    if Medication.objects.filter(patient_id="patient_001").exists():
        return

    records = [
        # Prenatal Vitamin
        dict(
            patient_id="patient_001",
            medication="Prenatal Vitamin",
            dose="1 tablet",
            frequency="once daily",
            route="oral",
            start_date=date(2025, 12, 15),
            end_date=None,
            source="Outpatient Clinic",
            reason="Prenatal supplementation",
            notes="Patient reports continued use",
        ),

        # Ferrous Sulfate
        dict(
            patient_id="patient_001",
            medication="Ferrous Sulfate",
            dose="325 mg",
            frequency="once daily",
            route="oral",
            start_date=date(2025, 11, 1),
            end_date=date(2025, 12, 1),
            source="Outpatient Clinic",
            reason="Iron deficiency anemia",
            notes="Completed course",
        ),

        # Labetalol – Hospital A (100 mg)
        dict(
            patient_id="patient_001",
            medication="Labetalol",
            dose="100 mg",
            frequency="twice daily",
            route="oral",
            start_date=date(2026, 1, 1),
            end_date=date(2026, 1, 10),
            source="Hospital A",
            reason="Gestational hypertension",
            notes="Initiated during admission",
        ),

        # Labetalol – Hospital B (100 mg)
        dict(
            patient_id="patient_001",
            medication="Labetalol",
            dose="100 mg",
            frequency="twice daily",
            route="oral",
            start_date=date(2026, 1, 1),
            end_date=date(2026, 1, 12),
            source="Hospital B",
            reason="Gestational hypertension",
            notes="Imported from external EHR",
        ),

        # Labetalol – Hospital A (200 mg)
        dict(
            patient_id="patient_001",
            medication="Labetalol",
            dose="200 mg",
            frequency="twice daily",
            route="oral",
            start_date=date(2026, 1, 11),
            end_date=date(2026, 1, 25),
            source="Hospital A",
            reason="Persistent hypertension",
            notes="Dose increased after elevated BP readings",
        ),

        # Aspirin
        dict(
            patient_id="patient_001",
            medication="Aspirin",
            dose="81 mg",
            frequency="once daily",
            route="oral",
            start_date=date(2025, 10, 1),
            end_date=None,
            source="Outpatient Clinic",
            reason="Preeclampsia risk reduction",
            notes="Low-dose aspirin prophylaxis",
        ),

        # Magnesium Sulfate – Hospital A
        dict(
            patient_id="patient_001",
            medication="Magnesium Sulfate",
            dose="2 g/hr",
            frequency="continuous infusion",
            route="IV",
            start_date=date(2026, 1, 5),
            end_date=date(2026, 1, 7),
            source="Hospital A",
            reason="Seizure prophylaxis",
            notes="Administered during labor",
        ),

        # Magnesium Sulfate – Hospital B
        dict(
            patient_id="patient_001",
            medication="Magnesium Sulfate",
            dose="1 g/hr",
            frequency="continuous infusion",
            route="IV",
            start_date=date(2026, 1, 6),
            end_date=date(2026, 1, 8),
            source="Hospital B",
            reason="Seizure prophylaxis",
            notes="Different dosing documented during transfer",
        ),

        # Oxytocin
        dict(
            patient_id="patient_001",
            medication="Oxytocin",
            dose="4 mU/min",
            frequency="continuous infusion",
            route="IV",
            start_date=date(2026, 1, 6),
            end_date=date(2026, 1, 6),
            source="Hospital A",
            reason="Labor induction",
            notes="Used during active labor",
        ),

        # Acetaminophen
        dict(
            patient_id="patient_001",
            medication="Acetaminophen",
            dose="650 mg",
            frequency="every 6 hours",
            route="oral",
            start_date=date(2026, 1, 4),
            end_date=None,
            source="Emergency Department",
            reason="Headache",
            notes="PRN use; end date not documented",
        ),
    ]

    Medication.objects.bulk_create(
        [
            Medication(
                patient_id="patient_001",
                **record,
            )
            for record in records
        ]
    )