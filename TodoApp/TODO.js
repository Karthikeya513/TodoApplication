let todocon = document.getElementById("todoItemsContainer");
let savebutton = document.getElementById("saveButton");
let addBut = document.getElementById("addButton");


function getItemfromstore() {
    let Item = localStorage.getItem("todoList");
    let parsed = JSON.parse(Item);
    if (parsed === null) {
        return [];
    } else {
        return parsed;
    }
}

let todoList = getItemfromstore();
let todocount = todoList.length;

savebutton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addItem() {
    let userinput = document.getElementById("todoUserInput");
    let userinputValue = userinput.value;
    if (userinputValue === "") {
        alert("enter valid input");
        return;
    }
    todocount = todocount + 1;
    let newTodo = {
        text: userinputValue,
        uniqueno: todocount,
        ischecked: false
    };
    todoList.push(newTodo);
    allinone(newTodo);
    userinput.value = "";
}

addBut.onclick = function() {
    addItem();
}

function change(checkboxId, labelId, todoId) {
    let checkboxel = document.getElementById(checkboxId);
    let labelel = document.getElementById(labelId);
    labelel.classList.toggle("checked");
    let required = todoList.findIndex(function(every) {
        let everyid = "todo" + every.uniqueno;
        if (everyid === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoobject = todoList[required];
    if (todoobject.ischecked === false) {
        todoobject.ischecked = true;
    } else {
        todoobject.ischecked = false;
    }
}

function deleteit(todoId) {
    let todoEl = document.getElementById(todoId);
    todocon.removeChild(todoEl);
    let index = todoList.findIndex(function(eachItem) {
        let each = "todo" + eachItem.uniqueno;
        if (each === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
}

function allinone(todo) {
    let checkboxId = "checkbox" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;
    let todoId = "todo" + todo.uniqueno;

    let todoele = document.createElement("li");
    todoele.classList.add("todo-item-container", "d-flex", "flex-row");
    todoele.id = todoId;
    todocon.appendChild(todoele);

    let inputele = document.createElement("input");
    inputele.type = "checkbox";
    inputele.id = checkboxId;
    inputele.classList.add("checkbox-input");
    inputele.onclick = function() {
        change(checkboxId, labelId, todoId);
    };
    inputele.checked = todo.ischecked;
    todoele.appendChild(inputele);

    let labelcon = document.createElement("div");
    labelcon.classList.add("label-container", "d-flex", "flex-row");
    todoele.appendChild(labelcon);

    let labelele = document.createElement("label");
    labelele.setAttribute("for", checkboxId);
    labelele.textContent = todo.text;
    labelele.id = labelId;
    labelele.classList.add("checkbox-label");
    if (todo.ischecked === true) {
        labelele.classList.add("checked");
    }
    labelcon.appendChild(labelele);

    let delcon = document.createElement("div");
    delcon.classList.add("delete-icon-container");
    labelcon.appendChild(delcon);

    let delele = document.createElement("i");
    delele.classList.add("far", "fa-trash-alt", "delete-icon");
    delele.onclick = function() {
        deleteit(todoId);
    };
    delcon.appendChild(delele);
}
for (let todo of todoList) {
    allinone(todo);
}