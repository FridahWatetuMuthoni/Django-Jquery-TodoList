from django import forms
from .models import Task


class TasksForm(forms.ModelForm):
    class Meta:
        title_classes = f"form-control"
        model = Task
        fields = ['title']
        widgets = {
            'title': forms.TextInput(attrs={'class': title_classes})
        }
