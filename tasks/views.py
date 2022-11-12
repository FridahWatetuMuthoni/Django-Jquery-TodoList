from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Task
from .forms import TasksForm

# Create your views here.


class TaskList(View):
    def get(self, request):
        form = TasksForm()
        tasks = Task.objects.all()
        context = {
            'form': form,
            'tasks': tasks
        }
        return render(request, 'home.html', context)

    def post(self, request):
        form = TasksForm(request.POST)

        if form.is_valid():
            new_task = form.save()
            return redirect('tasks')
        else:
            return redirect('tasks')
