//---Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

var msg = window.document.getElementById("msg");


let oldInputValue; //Para edição

//---Funções
//Começo obter hora
const clock = setInterval(function time() {
let data = new Date();
let hora = data.getHours();
let minutos = data.getMinutes();

const MinutosFormatados = minutos.toString().padStart(2, '0'); //Para sempre ter dois dígitos, e se não tiver preencher com zero

var time = window.document.getElementById('time');
time.innerHTML = `Horário atual: ${hora}:${MinutosFormatados}` //Minutos formatados

if(hora >=0 && hora<12){
    msg.textContent = 'Bom dia!';
} else if(hora>=12 && hora <18){
    msg.textContent = 'Boa tarde!';
} else {
    msg.textContent = 'Boa noite!'
}
})

//Fim obter hora

const saveTodo = (text) => {
// Adicioar todo
    const todo = document.createElement("div")
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = "<i class='fa-solid fa-check'></i>"
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = "<i class='fa-solid fa-pen'></i>"
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = "<i class='fa-solid fa-xmark'></i>"
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    saveData()
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

    const updateTodo = (text) => {
        const todos = document.querySelectorAll(".todo");

        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3");

            if(todoTitle.innerText === oldInputValue) {
                todoTitle.innerText = text;
            }
        });
    };

    function saveData(){
        localStorage.setItem("data", todoList.innerHTML); //Para salvar as tarefas
    }
    
function showTask(){
    todoList.innerHTML = localStorage.getItem("data"); //Para mostrar as tarefas salvas
}

showTask();


//---Eventos
todoForm.addEventListener("submit", (e) => { //Quando enivar o formulário pressionando o botão
    e.preventDefault() //Não enviar para o backend

    const inputValue = todoInput.value; //pegar o valor do input, para criar tarefa nova

    if(inputValue){ //Verificação para garantir que o usuário não crie tarefas sem título
        saveTodo(inputValue)
        saveData()
    }
});

//Identificar o clique nos botões
document.addEventListener("click", (e) => {

    const targetEl = e.target
    const parentEl = targetEl.closest("div"); //Selecionou a div mais próxima do elemento pai
    let todoTitle;
    
    if(parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        saveData();
    }
    
    // Identificando o botão de remoÇão
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        saveData();
    }

    // Identificando o botão de editar
    if(targetEl.classList.contains("edit-todo")) {
        toggleForms(); //Esconder o formulário e mostrar outro

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
        saveData();
    }

});

cancelEditBtn.addEventListener("click" , (e) => {
    e.preventDefault(); //para não enviar formulário 
    saveData();

    toggleForms();
});

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)
    }

    toggleForms();
    saveData();
})




