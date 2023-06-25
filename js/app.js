let $ = document
const itemInput = $.getElementById('itemInput')
const addBtnElem = $.getElementById('addButton')
const clearBtnElem = $.getElementById('clearButton')
const todoListElem = $.getElementById('todoList')


let TodoArray = []


function addNewTodo(){
    if(itemInput.value !=''){
        let TodoObj = {
            id : TodoArray.length+1,
            TodoTitle : itemInput.value,
            Complete : false
        }
        itemInput.value = ''
        TodoArray.push(TodoObj) 
        CreateTodoElem(TodoArray)
        itemInput.focus()
        localStoregeSet(TodoArray)
    }
    
 
}


function todoByEnter(event){
    if(event.code=="Enter"){
        if(itemInput.value !=''){
            addNewTodo(TodoArray)
        }
        
    }
}


function CreateTodoElem(todoList){
    console.log(todoList)
    let LiElem,LabelElem,BtnDeleteElem,BtnCompleteElem
    todoListElem.innerHTML = ''
    todoList.forEach(function(todo){


        LiElem = $.createElement('li')
        LiElem.className = 'completed well'
 
    
    
        LabelElem = $.createElement('label')
        LabelElem.innerHTML =todo.TodoTitle
    
    
        BtnDeleteElem = $.createElement('button')
        BtnDeleteElem.className = 'btn btn-danger'
        BtnDeleteElem.innerHTML = 'Delete'
        BtnDeleteElem.setAttribute('onclick','deletToDo('+todo.id+')')
    
    
        BtnCompleteElem = $.createElement('button') 
        BtnCompleteElem.className = 'btn btn-success'
        BtnCompleteElem.innerHTML = 'Complete'
        BtnCompleteElem.setAttribute('onclick','CompleteToDo('+todo.id+')')
        if(todo.Complete){
            LiElem.className = 'uncompleted well'
            BtnCompleteElem.innerHTML = 'unComplete'
        }


        
    
        LiElem.append(LabelElem,BtnCompleteElem,BtnDeleteElem)
        todoListElem.append(LiElem)

    })
}



function deletToDo(TOdoId){
    let i=1
    let  storegeArray = JSON.parse(localStorage.getItem('todos'))
    TodoArray=storegeArray
    // console.log(TodoArray)
    let MainIndex = TodoArray.findIndex(function(todo){
        return todo.id==TOdoId
    })
    TodoArray.splice(MainIndex, 1)
    TodoArray.forEach(function(newTodo){
        newTodo.id=i
           i++
    })
    localStoregeSet(TodoArray)
    CreateTodoElem(TodoArray)
}


function CompleteToDo(TOdoId){
    let  storegeArray = JSON.parse(localStorage.getItem('todos'))
    TodoArray=storegeArray
    TodoArray.forEach(function(todo){
    
        if(todo.id === TOdoId){
            todo.Complete = !todo.Complete
        }
    })
    localStoregeSet(TodoArray)
    CreateTodoElem(TodoArray)
}


function addTodoByLocalStorege(){
  let  storegeArray = JSON.parse(localStorage.getItem('todos'))
    if(storegeArray){
        TodoArray = storegeArray
    }else{
        TodoArray = [] 
    }
    CreateTodoElem(TodoArray)

}


function localStoregeSet(todoList){
    localStorage.setItem('todos',JSON.stringify(todoList))
}


function clearListTodo(){
    TodoArray = []
    CreateTodoElem(TodoArray)
    localStorage.removeItem('todos')
}


window.addEventListener('load',addTodoByLocalStorege)
itemInput.addEventListener('keydown',todoByEnter)
addBtnElem.addEventListener('click', addNewTodo)
clearBtnElem.addEventListener('click',clearListTodo)