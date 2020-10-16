import { Component, OnInit } from '@angular/core';
import {todomodel} from "./todomodel";
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'todolist';
  // when a task is being edited  
  edited = false;
  // initialize sample todo
  mytodo = new todomodel(0,'',false);
  // this array will always store list of todos retrieved from server
  mytodolist:  todomodel [];

  //injecting the dataservice
  constructor (private dataservice: TodoService) {
  }

  // submitting the form 
  onSubmit() {      
      this.saveTodo(this.mytodo);
      // resetting the mytodo value
      this.mytodo = new todomodel(0,'',false);
    }

  saveTodo(mytodo: todomodel){
    // if it is not an editing
    if (!this.edited) {
      if (this.mytodo.title=='') return;
      // saving new todo
        this.dataservice.createTodo(mytodo).subscribe(data=> {
          this.displayTodoList();
      });
    }
    // if we are editing an existing todo
    else {
      this.edited=false;
      console.log('this is being edited',mytodo);
            // update existing todo
      this.dataservice.updateTodo(this.mytodo.id,this.mytodo).subscribe(data =>
        {     
          this.displayTodoList();
        }       
        );
    }    
  }

  ngOnInit(){
    this.displayTodoList();
  }

  //this function retrieves the whole array of todos from server, using api service injected
  displayTodoList() {
    this.dataservice.getTodoList().subscribe(data =>
      {
        // as the Web Api doesn't sort the list of todos, we do here in the frontend
        this.mytodolist = data.sort((a,b)=> {
          if (a.id>b.id) return -1;
          if (a.id<b.id) return 1;
        });
        console.log('display', this.mytodolist);
      });
  }
  //deleting an existing todo
  Delete(id: number) { // without type info
    console.log('delete', id);    
    this.dataservice.deleteTodo(id).subscribe(data =>{
        this.displayTodoList();
      });
  }
  //editing an existing todo
  Edit(eid: number) { // without type info
    console.log('editing',eid);
    this.mytodo = this.mytodolist.filter(x=>x.id ==eid)[0];
    this.edited = true;   
  }

    //finalizing(crossing) an existing todo
  FinishTodo(eid: number) { // without type info
    // console.log('finishing', eid);   
    const mytodofinished = this.mytodolist.filter(x=>x.id ==eid )[0];
    mytodofinished.completed =  !mytodofinished.completed ;
    //calling the update observable
    this.dataservice.updateTodo(eid,mytodofinished).subscribe(data =>{     
        this.displayTodoList();
      });
  }

}
