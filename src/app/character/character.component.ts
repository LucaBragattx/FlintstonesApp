import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from './data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
