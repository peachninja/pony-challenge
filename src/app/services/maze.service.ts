import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maze } from '../models/maze';
@Injectable({
  providedIn: 'root'
})
export class MazeService {

  constructor(private http: HttpClient) { }

  createMaze(maze: any){
       return this.http.post(`https://ponychallenge.trustpilot.com/pony-challenge/maze`, maze,{ observe: 'response' });
   }

   printMaze(mazeId: any){
     return this.http.get(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${mazeId}/print`, {responseType: 'text'} );
   }

   nextMazeMove(direction: any){
     return this.http.post(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${sessionStorage.getItem('currentMaze')}`, direction,{responseType: 'text'} );
   }
   newMaze() {
       // remove user from local storage to log user out
       sessionStorage.removeItem('currentMaze');

   }
}
