import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../character/data-storage.service';
import { Character } from '../character/character.model';
import { CharacterService } from '../character/character.service';
import { Subscription } from 'rxjs';
import { BusinessLayerService } from '../Shared/business-layer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  subscription: Subscription;
  constructor(private dataStorageService: DataStorageService, private characterService: CharacterService, private businessService: BusinessLayerService) { }

  ngOnInit(): void {
  }

  getList(){
  }

  ngOnDestroy(): void {
  }
}
