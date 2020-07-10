//selection
const input = document.querySelector('.input');
const submit = document.querySelector('#submitBtn');
const todoList = document.querySelector('.todo-list');

//event listener
window.addEventListener('load' , get);
submit.addEventListener('click' , addTodoList);
todoList.addEventListener('click' , doneOrRemoved);
//adding a todo
function addTodoList(event) {

    event.preventDefault();
    /*
    <div>
                    <li></li>
                    <i></i>
                    <i></i>
                </div>
    */
   //todo div
   if(input.value)
   {
   const todoDiv = document.createElement('div');
   todoDiv.className = 'container mt-4 text-center';
   todoDiv.classList.add('todo-div');
   //li element
   const  li = document.createElement('li');
   li.innerText = input.value;
   li.className = 'list-group-item';
   li.classList.add('todo-li');
   todoDiv.appendChild(li);
   //add to local storage
   addToLocal(input.value);
   //done button
   const doneBtn = document.createElement('button');
   doneBtn.className = "btn btn-outline-success btn-lg ml-3 mt-4";
   doneBtn.classList.add('done');
   doneBtn.innerText = '✓';
   todoDiv.appendChild(doneBtn);
   //delete button
   const delBtn = document.createElement('button');
   delBtn.className = "btn btn-outline-danger btn-lg ml-3 mt-4";
   delBtn.classList.add('delete');
   delBtn.innerHTML = 'X';
   todoDiv.appendChild(delBtn);
   //adding the todo to  list in UI
   todoList.appendChild(todoDiv);
   //clearing the input
   input.value = '';
   showAlert('Task Added To List!!!!' , 'success');
} else {
    showAlert('please add a Task!!!' , 'danger');
}
}
//removing a todo
function doneOrRemoved(event) {
  event.preventDefault();
  //console.log(event.target.parentElement);
  if(event.target.classList.contains('delete')){
    event.target.parentElement.remove();
    //remove from local storage
    removeFromLocal(event.target.parentElement);
    showAlert('task removed!!' , 'success');
  } 
//completed task 
   if(event.target.classList.contains('done')) {
    event.target.parentElement.classList.toggle('completed');
    showAlert('task completed!!!!!' , 'success');
   }
}

//local storage application
function getTodoFromLocal() {
    let todos
    if(localStorage.getItem('todos') === null) {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}

function get() {
    const  todos = getTodoFromLocal();
    todos.forEach( el=> {
        const todoDiv = document.createElement('div');
        todoDiv.className = 'container mt-4 text-center';
        todoDiv.classList.add('todo-div');
        //li element
        const  li = document.createElement('li');
        li.className = 'list-group-item';
        li.classList.add('todo-li');
        li.innerText = el;
        todoDiv.appendChild(li);
        //done button
        const doneBtn = document.createElement('button');
        doneBtn.className = "btn btn-outline-success ml-3"
        doneBtn.classList.add('done');
        doneBtn.innerText = '✓';
        todoDiv.appendChild(doneBtn);
        //delete button
        const delBtn = document.createElement('button');
        delBtn.className = "btn btn-outline-danger ml-3 ";
        delBtn.classList.add('delete');
        delBtn.innerHTML = 'X';
        todoDiv.appendChild(delBtn);
        //adding the todo to  list in UI
        todoList.appendChild(todoDiv);
        //clearing the input
        input.value = '';
    });
}
//adding to local storage
function addToLocal(todo) {
  const todos = getTodoFromLocal();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

//removing from local storage 
function removeFromLocal(todo) {
    const todos = getTodoFromLocal();
    const getIndexOf = todo.children[0].innerText;
    todos.splice(todos.indexOf(getIndexOf) , 1);

    localStorage.setItem('todos' , JSON.stringify(todos));
}
//alert
function showAlert(msg , classType) {
    const div = document.createElement('div');
    div.className =`alert alert-${classType}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div , form);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    },1500);
}