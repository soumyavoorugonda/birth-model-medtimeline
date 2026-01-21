from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Medication
from .serializers import MedicationSerializer

class MedicationTimelineView(APIView):

    def get(self, request, patient_id):
        medications = Medication.objects.filter(patient_id=patient_id).order_by("start_date", 'medication_name')
        serializer = MedicationSerializer(medications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    