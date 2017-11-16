import { Component, OnInit } from '@angular/core';
import {TodoListWithItems, TodoListJSON, TodoListService, ItemJSON} from "../todo-list.service";
import {List} from "immutable";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists = List<TodoListJSON>();

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  getLists(): TodoListWithItems[] {
    return this.todoListService.getLists();
  }

  createList(name: string) {
    const localListID = this.todoListService.SERVER_CREATE_NEW_LIST(name, {
      color: "#ffffff",
      someOtherAttribute: "pourquoi pas un texte ?"
      // Add other data here...
    });
  }
}
