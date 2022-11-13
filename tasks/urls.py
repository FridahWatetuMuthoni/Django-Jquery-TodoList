from django.urls import path
from . import views

urlpatterns = [
    path('', views.TaskList.as_view(), name='tasks'),
    path('completed/<str:id>',views.TaskCompleted.as_view(),name="task-completed"),
    path('delete/<str:id>',views.TaskDelete.as_view(),name="task-delete")

]
