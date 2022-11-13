from django.shortcuts import render, redirect,get_object_or_404
from django.views.generic import View
from .models import Task
from .forms import TasksForm
from django.http import JsonResponse
from django.forms.models import model_to_dict

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
            return JsonResponse({"task":model_to_dict(new_task)},status=200)
        else:
            return redirect('tasks')

class TaskCompleted(View):
    def post(self,request,id):
        task = get_object_or_404(Task,id=id)
        if(task.completed):
            task.completed = False
        else:
            task.completed= True
        task.save()
        return JsonResponse({'task':model_to_dict(task)},status=200)

class TaskDelete(View):
    def post(self,request,id):
        task = get_object_or_404(Task,id=id)
        task.delete()
        return JsonResponse({"result":"ok"},status=200)