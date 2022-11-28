/**
 * @jest-environment jsdom
 */

// Jag har tagit de tester jag tänkte ut när jag gick igenom koden och angett
// dem nedan också. Dessa är på svanska. Kom på att de kanske borde vara på engelska
// Hoppas OK så här. La in beskrivningarna på testerna i describe och test på engelska
// OBS! Jag kommer inte vara klar 8:30 men lämnar in
// Ska även lägga in någon test av DOM som jag inte hunnit än

import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
//Läser ine från main.tes också funktionerna
import { createNewTodo, createHtml, toggleTodo, displayError, clearTodos } from "../ts/main";
import { Todo } from "../ts/models/Todo";


//T: 1. Testa inläsning av det som finns local storage
//   a) Testar att läsa in när det finns en i LS
//   b) Testar att läsa in när flera i LS
//   c) Testar att läsa in när LS är tomt. Antar att jag då måste rensa LS först
//
//   let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

describe("1. Read from LS", () => {

  test("1.a Read when one in LS", () => {
  // Arrange
  // Add a Todo that can be read from LS
  let testTodos: Todo[] = [new Todo("Sova", false)];
  localStorage.setItem("todos", JSON.stringify(testTodos));

  //Act
// Read from LS check the code
 let Todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
 let length = Todos.length

  // Assert
  expect(length).toBe(1);
  });

  test("1.b Read when more than one in LS", () => {
  // Arrange
  // Add a Todo that can be read from LS. Maybe an extra test not needed.
  let testTodos: Todo[] = [new Todo("Sova", false), new Todo("Äta", false)];
  localStorage.setItem("todos", JSON.stringify(testTodos));

  //Act
// Read from LS check the code
 let Todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
 let length = Todos.length

  // Assert
  expect(length).toBe(2);
  });

  test("1.c Read when LS empty", () => {
  // Arrange
  // Add a Todo that can be read from LS. Maybe an extra test not needed.
  let testTodos: Todo[] = [];
  localStorage.setItem("todos", JSON.stringify(testTodos));

  //Act
// Read from LS check the code
 let Todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
 let length = Todos.length

  // Assert
  expect(length).toBe(0);
  });
  
});


//T: 2. Testa rensa listan och kolla att inget kvar i
//      kvar i local storage


test("2. Clear list/ClearTodos", () => {
  // Arrange
  // Add a Todo that can be cleared
    let testTodos: Todo[] = [new Todo("Städa", false)];
    localStorage.setItem("todos", JSON.stringify(testTodos));
    let length = testTodos.length
 
  //Act
  // Run clearTodos
  clearTodos(testTodos);
  // Want to LS is empty so I guess I need to read from LS. Can I do like this?
  testTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  // Assert
  expect(length).toBe(0);
});

//T: 3. Testa att skapa en ny ToDO
//   a. Testa att skapa en ToDo med 2 tecken och kolla att error tillbaka. 
//   b. Testa att skapa en ToDo med 3 tecken och kolla att den returnerar true
//      samt kollar att den läggs in både i array todos och även lagras i local storage

describe("3. Create new ToDo/createNewToDo", () => {

  test("3.a Try to create new ToDo with 2 letters", () => {
    // Arrange
    let testTodos: Todo[] = [new Todo("Borsta tänderna", false)];
    let length = testTodos.length;
    let testText: string = "ab";

   //Act
   createNewTodo(testText, testTodos);

    // Assert
    // Test display Error and length same
    expect(displayError).toBe(true);
    expect(testTodos.length).toBe(length);
    });


  test("3.b Create ToDo with 3 letters", () => {
    // Arrange
    let testTodos: Todo[] = [new Todo("Borsta tänderna", false)];
    let length = testTodos.length;
    let testText: string = "abc";

   //Act
   createNewTodo(testText, testTodos);

    // Assert
    // Test display Error och även att längden är samma
    expect(displayError).toBe(false);
    expect(testTodos.length).toBe(length+1);
    expect(testTodos[testTodos.length-1].text).toBe(testText);
  });

});

//T: 4. Testa att togglinng fungerar se även funktionen nedan
//      testa även att det lagra ner i local storage

test("Toggling of done in list and check LS", () => {
  // Arrange
  // Add two ToDo one with done false and one with true
  let testTodos: Todo[] = [new Todo("Toggle 1", false), new Todo("Toggle 2", true)];
  localStorage.setItem("todos", JSON.stringify(testTodos));

  //Act
  // Read from LS check the code
   toggleTodo(testTodos[0]); 
   toggleTodo(testTodos[1]);


  // Assert
     expect(testTodos[0].done).toBe(true);
     expect(testTodos[1].done).toBe(false);
});


