import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BusinessLayerService } from '../Shared/business-layer.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-delete',
  templateUrl: './character-delete.component.html',
  styleUrls: ['./character-delete.component.css']
})
export class CharacterDeleteComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isFetching: boolean;
  alive: boolean = true;

  constructor(private businessService: BusinessLayerService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    try
    {
      this.businessService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.deleteCharacter(response);
      });
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Checks the value of the response code passed from the business services behaviour subject to perform actions accordingly
  deleteCharacter(response: string){
    try
    {
      if (response === '200') { 
        this.isFetching = false;
        console.log('Delete item: ' + response);
        this.router.navigate(['/', 'list']);
        const dialogRef = this.dialog.open(AlertDialogComponent,{
                data:{
                  message: 'Character '+ this.businessService.id +  ' has been deleted successfully!',
                  buttonText: {
                    cancel: 'Done'
                  }
                }});
      } 
      else if(response ==='401')
      {
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
          this.businessService.setResponseCode.next('200');
          this.ngOnInit();
          console.log(dialogResult);
        }
        else
        {
          this.router.navigate(['/', 'logout']);
        }
      });
      }
      else
      {
        console.log("Delete wasn't 200.");
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
