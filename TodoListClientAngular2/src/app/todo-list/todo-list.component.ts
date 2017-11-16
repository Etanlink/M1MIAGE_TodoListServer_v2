import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {DragItem, ItemJSON} from "../../data/protocol";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() list: TodoListWithItems;
  @Input() clock: number;
  @Input() lists: TodoListWithItems[];

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  createItem(label: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(
      this.list.id,
      label,
      false,
      {categories: [],dateD: Date.now(),dateF: Date.now()}
    );
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    console.log("setColor", color);
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  /* Add drag&drop*/
  changeList(dragEvent) {
    const dragItem: DragItem = dragEvent.dragData;
    this.todoListService.SERVER_CHANGE_ITEMLIST(dragItem.listId, dragItem.item.id, this.list.id);
  }
}
