from django.urls import path
from .views import MedicationTimelineView

urlpatterns = [
    path(
        "patients/<str:patient_id>/",
        MedicationTimelineView.as_view(),
        name = "patient_medication_timeline",
    )
]