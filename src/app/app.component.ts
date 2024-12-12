import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './character/data-storage.service';
import { CharacterService } from './character/character.service';
import { Character } from './character/character.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(){

  }

  ngOnInit(): void {
  }
  title = 'flintstones-app';
}
