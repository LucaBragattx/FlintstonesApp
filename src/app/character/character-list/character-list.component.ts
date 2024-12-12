import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../character.model';
import { BusinessLayerService } from 'src/app/Shared/business-layer.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { TabService } from 'src/app/Shared/tab.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy{
  characters: Character[] = [];
  isFetching : boolean;
  deleteFetching: boolean;
  alive: boolean = true;

  constructor(private businessService: BusinessLayerService, private dialog: MatDialog, private router: Router, private tabService: TabService) { }

  ngOnInit(): void {
    try
    {
      //Checks to see if the data has already been fetched
      if (!this.businessService.fetched)
      {
        this.businessService.setCharacter();
      }
  
      this.refreshList();
  
      this.businessService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.getList(response);
      });
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Updates the list in the component
  refreshList(){
    try
    {
      this.characters = this.businessService.characters;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Navigates the user to the new component
  addNew(){
    try
    {
      this.businessService.setResponseCode.next('0');
      this.router.navigate(['/', 'new']);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Checks the value of the response code passed from the business services behaviour subject to perform actions accordingly
  getList(response: string){
    try
    {
      if (response === '200') { 
        this.isFetching = false;
        this.businessService.fetched = true;
        this.refreshList();
        console.log('List: ' + response)
      } if (this.businessService.fetched)
      {
        this.isFetching = false;
      }
      else if(response ==='401'){
        this.router.navigate(['/', 'logout']);
      }
      else if(response ==='601')
      {
        const dialogRef = this.dialog.open(AlertDialogComponent,{
          data:{
            message: 'An error has occured! Would you like to refresh the page?',
            buttonText: {
              cancel: 'Yes'
            }
          },
        });
  
        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
            this.businessService.resetCode();
            this.businessService.setCharacter();
            console.log(dialogResult);
          }
          else{
            this.router.navigate(['/', 'logout']);
          }
          
       });
      }
      else{
        this.isFetching = true;
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
