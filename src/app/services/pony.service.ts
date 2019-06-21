import { Injectable } from '@angular/core';
import {Pony} from '../models/pony';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PonyService {

   ponies:Pony[] = [
    {name: 'Twilight Sparkle'},
    {name: 'Applejack'},
    {name: 'Fluttershy'},
    {name: 'Rarity'},
    {name: 'Pinkie Pie'},
    {name: 'Rainbow Dash'},
   ]
  constructor() { }

   getPonies():  Observable<Pony[]> {
    return of(this.ponies);
  }
}
