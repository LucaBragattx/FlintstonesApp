import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Character } from '../../character.model';
import { CharacterService } from '../../character.service';
import { Router } from '@angular/router';
import { DataStorageService } from '../../data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { BusinessLayerService } from 'src/app/Shared/business-layer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.css']
})
export class CharacterItemComponent implements OnInit, OnDestroy {
  @Input() character : Character;
  @Input() id: number;
  subscription : Subscription;
  subscription4 : Subscription;

  constructor(private characService: CharacterService, private router: Router, private dataStorageService: DataStorageService, private dialog: MatDialog, private businessService: BusinessLayerService) { }

  ngOnInit(): void {

  }

  //Calls the delete character method that calls the general post and navigates the user to the delete component based of the characters id in the list
  onDelete(){
    try
    {
      this.businessService.deleteCharacter(this.id);
      console.log(this.id);
      this.router.navigate(['/', 'delete', this.id]);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Navigates the user to the update component based off the characters id in the list
  directToUpdate() {
    try
    {
      this.businessService.setResponseCode.next('0');
      this.router.navigate(['/', 'update', this.id]);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Navigates the user to the details component based off the characters id in the list
  directToDetails() {
    try
    {
      this.router.navigate(['/', 'list', this.id]);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
  }
}
