import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MazeComponent } from './maze/maze.component';

const routes: Routes = [ { path: '', component: MazeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
