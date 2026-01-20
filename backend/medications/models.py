from django.db import models

class Medication(models.Model):
    patient_id = models.CharField(max_length=64)
    medication_name = models.CharField(max_length=255)
    dose = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    route = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    source = models.CharField(max_length=255)
    reason = models.CharField(max_length=255, blank=True)
    notes = models.TextField(blank=True)
    last_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medication_name} ({self.patient_id})"