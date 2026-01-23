from django.core.management.base import BaseCommand
from medications.seed import seed_data

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        seed_data()