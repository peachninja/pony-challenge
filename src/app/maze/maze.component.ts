import { Component, OnInit } from '@angular/core';
import {PonyService} from '../services/pony.service';
import {MazeService} from '../services/maze.service';
import {Pony} from '../models/pony'
import {Maze} from '../models/maze'

import {NgForm} from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.less']
})
export class MazeComponent implements OnInit {
  ponies: Pony[] = [];
  nextMove: any;
  warn_text = "";
  defaultName = "Twilight Sparkle";
  mazeId = "";

  mazeToPrint = "";
  moveDescription = "";
  poniesForm = new FormGroup({
  player_name: new FormControl(''),
  maze_width: new FormControl(15),
  maze_height: new FormControl(15),
  maze_diff: new FormControl(0)
});
  constructor(private ponyService:PonyService, private mazeService:MazeService) { }

  ngOnInit() {
    this.getPonies();
  }
  ngOnDestroy() {
         // unsubscribe to ensure no memory leaks
         //this.mazeId.unsubscribe();

    }
//destroy current mazeId
newMaze(){
  this.mazeService.newMaze();
  this.mazeId = "";
}

//get list of ponies from ponyService
getPonies(){
this.ponyService.getPonies().subscribe(ponies => { this.ponies = ponies; });
}
//take value from button to which direction to move
goThisDirection(direction){
  let directionObj = {
  "direction": direction
};
this.mazeService.nextMazeMove(directionObj).subscribe(data=>{
    var obj = data.replace('-', '_');
    this.nextMove = JSON.parse(obj);
   if(this.nextMove.state_result == "You lost. Killed by monster" || this.nextMove.state_result == "Can't walk in there"){
        this.moveDescription = this.nextMove.state_result;
    }
    else{
        this.moveDescription = "You move "+ direction;
    }
    this.printMaze(sessionStorage.getItem('currentMaze'));






});

}
onKeydown(event){

  switch(event.key) {
   case "ArrowUp": {
      //statements;
      console.log("north");
      return "north"
      break;
   }
   case "ArrowDown": {
      //statements;
      return "south"
      break;
   }
   case "ArrowLeft": {
      //statements;
      return "west"
      break;
   }
    case "ArrowRight": {
         //statements;
         return "west"
         break;
      }

}

}
//create new maze
createMaze(maze){
    this.mazeService.createMaze(maze).subscribe(data=>{

          var stringify =JSON.stringify(data['body']);
          sessionStorage.setItem('currentMaze',  stringify.split(':')[1].split('}')[0].replace('"', '').replace('"', ''));// since returns always returns a single object in the array.
           this.mazeId = sessionStorage.getItem('currentMaze');
        console.log(this.mazeId);
        this.printMaze(sessionStorage.getItem('currentMaze'));
    });

}

printMaze(id){
  this.mazeService.printMaze(id).subscribe(data=>{

      //  var stringify =JSON.stringify(data['body']); // since returns always returns a single object in the array.
       this.mazeToPrint = data;

  });
}
onSubmit() {
    console.log(this.poniesForm.value.player_name);


  if(this.poniesForm.value.player_name != '' ){
  this.warn_text = "";

     let maze = {
    "maze-width": this.poniesForm.value.maze_width,
    "maze-height": this.poniesForm.value.maze_height,
    "maze-player-name": this.poniesForm.value.player_name,
    "difficulty": this.poniesForm.value.maze_diff
    };
    // const myObjStr = JSON.stringify(maze);

   this.createMaze(maze);


    }
    else{
       this.warn_text = "Please choose your pony";
   }

    // false
  }
}
