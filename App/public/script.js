console.log("hello");
const RESPONSE_DONE = 4;
const STATUS_CHECK = 200;
const TODOS_LIST_ID = "todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";
const COMPLETED_LIST_ID = "completed_list_div";
const DELETED_LIST_ID = "deleted_list_div";

window.onload = getTodosAJAX();
function addTodoElements(id_active,id_completed,id_deleted,todo_data_json)
{
    var todos = JSON.parse(todo_data_json);
    var parent_active = document.getElementById(id_active);
    var parent_complete = document.getElementById(id_completed);
    var parent_delete = document.getElementById(id_deleted);
    parent_active.innerHTML = "";
    parent_complete.innerHTML="";
    parent_delete.innerHTML="";
    if(parent_active || parent_complete)
    {
        Object.keys(todos).forEach(
            function(key)
            {
                var todo_element = createTodoElement(key,todos[key]);
                if(todos[key].status=="Active")
                    parent_active.appendChild(todo_element);
                else if(todos[key].status=="Complete") {
                    parent_complete.appendChild(todo_element);
                }
                else if(todos[key].status=="Delete")
                    parent_delete.appendChild(todo_element);
            })
    }
}
function createTodoElement(id, todo_object) {
    var todo_element = document.createElement("div");
    if(todo_object.status == "Active") {
        todo_element.innerHTML = "<input type='checkbox' id='checkbox_id' onclick='handle_click("+id+",this)' class='checkbox'>"+todo_object.title+"<button class='button' onclick='getDeletedTodos("+id+")'>x</button>";
    }
    else if(todo_object.status=="Complete"){
        todo_element.innerHTML = "<input type='checkbox' id='checkbox_id' onclick='handle_click("+id+",this)' class='checkbox' checked>" + todo_object.title +"<button class='button' onclick='getDeletedTodos("+id+")'>x</button>";
    }
    else if(todo_object.status=="Delete"){
        todo_element.innerText = todo_object.title;
    }
    var checkbox_element = document.getElementById("checkbox_id");
    todo_element.setAttribute(
        "class", "todoStatus"+ todo_object.status + " " + "breathVertical"
    );
    return todo_element;
}

function handle_click(id,checkbox) {
    if(checkbox.checked==true)
    {
        getCompletedTodos(id);
    }
    else if(checkbox.checked==false)
    {
        updateActiveTodos(id);
    }
}
function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE)
        {
            if (xhr.status == STATUS_CHECK)
            {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID,COMPLETED_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
function addTodoAJAX() {
    var title  = document.getElementById(NEW_TODO_INPUT_ID).value;
    document.getElementById(NEW_TODO_INPUT_ID).value = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader(
        "Content-type","application/x-www-form-urlencoded");
    if(title!="")
        var data = "todo_title=" + encodeURI(title);
    else
        console.log("Error");
    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE)
        {
            if (xhr.status == STATUS_CHECK) {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID,COMPLETED_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function getCompletedTodos(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader(
        "Content-type","application/x-www-form-urlencoded");
    var data = "todo_status=Complete";
    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE)
        {
            if (xhr.status == STATUS_CHECK) {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID,COMPLETED_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function updateActiveTodos(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader(
        "Content-type","application/x-www-form-urlencoded");
    var data = "todo_status=Active";
    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE)
        {
            if (xhr.status == STATUS_CHECK) {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID,COMPLETED_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data);
}


function getDeletedTodos(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id,true);
    xhr.onreadystatechange = function () {

        if(xhr.readyState == RESPONSE_DONE)
        {
            if (xhr.status == STATUS_CHECK) {
                console.log(xhr.responseText);
                addTodoElements(TODOS_LIST_ID,COMPLETED_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
function hide_del_items() {

    var element = document.getElementById("deleted_list_div");
    element.style.visibility='hidden';

}
function hide_com_items() {

    var element = document.getElementById("completed_list_div");
    element.style.visibility='hidden';

}