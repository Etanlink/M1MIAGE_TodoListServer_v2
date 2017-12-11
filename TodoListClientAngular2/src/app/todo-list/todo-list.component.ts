import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListWithItems, TodoListService} from "../todo-list.service";
import {DragItem, ItemJSON, ItemID} from "../../data/protocol";

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

  private editingLabel = false;
  private editingDescription = false;
  private showingDescription = false;

  constructor(private todoListService: TodoListService) { }

  ngOnInit() {
  }

  setLabel(label: string) {
    if (label === "") {
      this.delete();
    } else {
      this.todoListService.SERVER_UPDATE_LIST_NAME(this.list.id, label);
    }
    this.editLabel(false);
  }

  isEditingLabel(): boolean {
    return this.editingLabel;
  }

  editLabel(edit: boolean) {
    this.editingLabel = edit;
  }

  setDescription(description: string) {
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      {description: description, color: ""}
    );
  }

  showDescription() {
    this.showingDescription = ! this.showingDescription;
  }

  isShowingDescription(): boolean {
    return this.showingDescription;
  }

  isEditingDescription(): boolean {
    return this.editingDescription;
  }

  editDescription(edit: boolean) {
    this.editingDescription = edit;
  }

  getDescription(){
    if(this.list.data.description.length == 0) {
      return "Aucune description";
    }
    else {
      return this.list.data.description;
    }
  }

  createItem(label: string) {
    const id = this.todoListService.SERVER_CREATE_ITEM(
      this.list.id,
      label,
      false,
      {date: Date.now()}
    );
  }

  delete() {
    this.todoListService.SERVER_DELETE_LIST(this.list.id);
  }

  getColor(): string {
    return this.list.data["color"] ? this.list.data["color"] : "#FFFFFF";
  }

  setColor(color: string) {
    this.todoListService.SERVER_UPDATE_LIST_DATA(
      this.list.id,
      Object.assign({}, this.list.data, {color})
    );
  }

  /* Add drag&drop*/
  dragItem(dragEvent) {
    const dragItem: DragItem = dragEvent.dragData;
    this.todoListService.SERVER_CHANGE_ITEMLIST(dragItem.listId, dragItem.item.id, this.list.id);
  }

  duplicateList() {
    this.todoListService.SERVER_DUPLICATE_LIST(this.list.id);
  }

  filterNotDoneItems() {
    return this.list.items.filter(x => x.checked == false);
  }
  filterDoneItems() {
    return this.list.items.filter(x => x.checked == true);
  }
}
