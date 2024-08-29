import Bool "mo:base/Bool";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

actor {
  // Define the Todo type
  public type Todo = {
    id: Nat;
    description: Text;
    completed: Bool;
  };

  // Stable variable to store todos
  stable var todoItems : [Todo] = [];

  // Mutable variable for the next available ID
  var nextId : Nat = 1;

  // Add a new todo item
  public func addTodo(description : Text) : async Nat {
    let newTodo : Todo = {
      id = nextId;
      description = description;
      completed = false;
    };
    todoItems := Array.append(todoItems, [newTodo]);
    nextId += 1;
    newTodo.id
  };

  // Get all todo items
  public query func getTodos() : async [Todo] {
    todoItems
  };

  // Toggle completion status of a todo item
  public func toggleTodo(id : Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Todo>({ id = id; description = ""; completed = false }, todoItems, func(a, b) { a.id == b.id });
    switch (index) {
      case null { #err("Todo not found") };
      case (?i) {
        let updatedTodo = {
          id = todoItems[i].id;
          description = todoItems[i].description;
          completed = not todoItems[i].completed;
        };
        todoItems := Array.tabulate<Todo>(todoItems.size(), func (j) {
          if (j == i) { updatedTodo } else { todoItems[j] }
        });
        #ok()
      };
    }
  };

  // Delete a todo item
  public func deleteTodo(id : Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Todo>({ id = id; description = ""; completed = false }, todoItems, func(a, b) { a.id == b.id });
    switch (index) {
      case null { #err("Todo not found") };
      case (?i) {
        todoItems := Array.tabulate<Todo>(todoItems.size() - 1, func (j) {
          if (j < i) { todoItems[j] } else { todoItems[j + 1] }
        });
        #ok()
      };
    }
  };
}
