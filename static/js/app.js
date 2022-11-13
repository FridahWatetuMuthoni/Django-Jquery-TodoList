$(document).ready(function(){
    //Getting the csrf token already available on the page
    const csrf_token =$("input[name=csrfmiddlewaretoken]").val()

    //Adding an event listener to the button on click
    $("#create-btn").click(function(){
        let form = $('#create-form')
        //getting the csrf token from the form because we will need it when posting data
        let serialized_data = form.serialize()
        console.log(serialized_data)

        //creating an ajax post request
        //The ajax function takes in a dictornary
        $.ajax({
            url:'/',
            data:serialized_data,
            type:'post',
            success:function(response){
                //inject the data to the html
                //Get the task list(the div to inject the html)
                let task_list = $("#task-list")

                //The card layout
                let card = `
                <div id="task-card" class="card my-2" data-id="${response.task.id}">
                    <div class="card-body d-flex justify-content-between">
                        ${response.task.title}
                    <button type="button" id='delete' data-id="${response.task.id}" class="btn-close"></button>
                    </div>
                </div>
                `
                //appending the card to the div
                task_list.append(card)
            }
        })
        //clearing the form input after submission
        form[0].reset()
    })

    //Creating an event listener on the parent div
    //We are going to use event delegation to get to the card
    $("#task-list").on("click",".card",function(){
        let task_id = $(this).data('id')
        //marking task as completed
        $.ajax({
            url:`/completed/${task_id}`,
            data:{
                csrfmiddlewaretoken:csrf_token,
                id:task_id
            },
            type:'post',
            success:function(response){
                let current_card = $(`#task-card[data-id=${task_id}]`)
                if(response.task.completed){
                    current_card.addClass('line-through')
                }
                else{
                    current_card.removeClass('line-through')
                }
                
                location.reload(true)
            }
        })
    })

    //Deleting items
    $('#task-list').on('click','#delete',function(e){
        //it stops the events from bubbling
        e.stopPropagation()  //event only happens on the button
        const delete_id = $(this).data('id')
        $.ajax({
            url:`delete/${delete_id}`,
            data:{
                csrfmiddlewaretoken:csrf_token
            },
            type:'post',
            dataType:'json',
            success:function(response){
                const current_task = $(`#task-card[data-id=${delete_id}]`)
                current_task.remove()
                location.reload(true)

            }
        })
    }) 
})