// I denna kopia av main.ts lägger jag in kommentarer och tänkta tester
// för mig känns det bra att göra det innan jag börjar att skriva testerna,
// Hoppas det är OK.
// Sedan får jag inte koden att fungera. Går inte att skapa men det är kanske det
// som jag ska testa fram... 

//Nedan F: = Förklaring, T: = Testfall tankar 

//F: Inport av funitioner från functions.ts och ToDo som är text:string done:boleean
import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";

//F: Läser in i början det som finns redan i local storage och att det vi
//T: 1. Testa inläsning av det som finns local storage
//   a) Testar att läsa in när det finns en i LS
//   b) Testar att läsa in när flera i LS
//   c) Testar att läsa in när LS är tomt. Antar att jag då måste rensa LS först

let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

//F: Känner av knappen med id:ClearTodos och om klick skickar till funktionen
//   clearTodos som finns i slutet på main.ts och i clearTodos kallar i sin tur på
//   removeAllTodos som finns i function.ts som splice tar bort allt i todos.length
//   och kallar även på createHTML(todos) och i detta fall en tom todos för rensad

//T: 2. Testa rensa listan och kolla att inget kvar i arrayeen todos och ingen 
//      kvar i local storage

document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

//F: Känner av hela form newTodoForm efter ett submit. Lite frågande varför hela
//   och i html bara en button med texten skapa. Ser till att sidan inte laddas om.
//   Sätter todoText till det som skrivits i rutan och skriver det till console.log
//   Kallar på funktionen createNewTodo som finns nedan som i sin tur kallar på 
//   funktionen addTodo som finns i functions.ts. Den funktionen kollar om ToDo
//   är minst 2 tecken och om  lägger till den med push i todo arrayen. Antingen skapas 
//   ToDo med funktionen cretateHtml eller så visas felmeddelande med displayError
   
//T: 3. Testa att skapa en ny ToDO
//   a. Testa att skapa en ToDo med 2 tecken och kolla att error tillbaka. 
//   b. Testa att skapa en ToDo med 3 tecken och kolla att den returnerar true
//      samt kollar att den läggs in både i array todos och även lagras i local storage
  
(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    createNewTodo(todoText, todos);
  }
);

//F: Denna funktion kallas på ovan när en ny Todo ska skapas, Se förklaring
//   och testfall ovan. Som nämns kallar den på addTodo i funktion.ts
//   och beroende på om anger mer än två tecken skapas Todo eller också error

function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

//F: Den här funktionen skapar html todo men den gör också fler saker
//   först läser ner hela todos som en string till ocal storage
//   Dén fångar upp ul listan i html med id=todos och sätter den först till ""
//   sedan loopar den igenom hela todos och skapar todo en efter en. Om den är satt
//   till done lägger till klassen todo__text--done som gör line through. Sedan till alla
//   lägger till formattering todo__text och sätter värdet. Därefter läggs
//   addEventlistener som gör att man kan toggla mellan done och inte done
//   Sist så visas varje rad med appenChild inom tododContainer som är UL listan

//T: 4. Testa att togglinng fungerar se även funktionen nedan
//      testa även att det lagra ner i local storage

function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

// F: Funktionen som lagts till ovan och känns av varje rad som togglar mellan
//    done och inte done. Man ser det på skärmen genom att raden är genomstruken
//    Sedan kallas på funktion changeTodo som finns i function.ts och därefter
//    på createHtml funktionen ovan som läser in i storage och visar en li per ToDo
//    detta gör att ToDo görs om varje gång man togglar så att den visar rätt status
//   samt att i createHtml lagras det även när i local storage så det byts där också-

function toggleTodo(todo: Todo) {
  changeTodo(todo);
  createHtml(todos);
}

// F: Visar error message om 2 eller färre tecken och med klasser säter om den ska
//    ska visas eller ej
function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}

// F: Rensar listan. Finns redan beskriver under knappen Rensa listan tidigare
function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

// F: För att skapa sidan även första gången så behöver denna vara med
createHtml(todos);
