const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput =document.querySelector("#todoSearch");


let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",AllTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function filter(e){
      const filterValue=e.target.value.toLowerCase().trim();
      const todoListesi = document.querySelectorAll(".list-group-item");

      if(todoListesi.length>0){
            todoListesi.forEach (function(todo){
              if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                   todo.setAttribute("style","display : block");
              } 
              else{
                todo.setAttribute("style","display : none !important");
              }
            });
      }
      else{
        showAlert("warning","filtreleme için en az1 todo gerekli");
      }
}


function AllTodosEverywhere(){
    const todoListesi =document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
      todoListesi.forEach(function(todo){
          todo.remove();
      });

      todos=[]
      localStorage.setItem("todos",JSON.stringify(todos));
    }
    else{
        showAlert("warning","silmek için en az 1  todo gerekli")
    }
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}

function removeTodoToUI(e){
    if(e.target.className=="fa fa-remove"){
        const todo=e.target.parentElement.parentElement;
        todo.remove();

        removeTodoToStorage(todo.textContent);
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
       if(removeTodo==todo){
        todos.splice(index,1); //burdan buraya sil
       }
});
localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız");
    }
    else{
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo Eklendi.");

    }
    e.preventDefault();
}

function addTodoToUI(newTodo){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#"
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value= "";
    
}
function addTodoToStorage(newTodo){
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos",JSON.stringify(todos));
   
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos")==null){
        todos = [];
       }
       else{
        todos = JSON.parse(localStorage.getItem("todos"));
       }
}

function showAlert(type, message){
   const div = document.createElement("div");
   div.className = "alert alert-"+type;
   div.textContent = message;

   firstCardBody.appendChild(div);

   setTimeout(function(){
        div.remove();
   }, 2000);
}
