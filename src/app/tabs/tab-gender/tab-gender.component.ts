import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColDef, ISetFilterParams } from 'ag-grid-community';
import { takeWhile } from 'rxjs/operators';
import { TabService } from 'src/app/Shared/tab.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Character } from 'src/app/character/character.model';

@Component({
  selector: 'app-tab-gender',
  templateUrl: './tab-gender.component.html',
  styleUrls: ['./tab-gender.component.css']
})
export class TabGenderComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  isFetching: boolean;
  tabTracker: string;
  alive: boolean = true;

  public columnDefs: ColDef[] = [
    // set filters
    { field: 'imagePath', cellRenderer: (params) => `<img style="height: 27x; width: 27px" src=${params.data.imagePath} />` },
    { field: 'name', filter: 'agTextColumnFilter' },
    {
      field: 'description',
      filter: 'agTextColumnFilter',
      filterParams: {
        applyMiniFilterWhileTyping: true,
      } as ISetFilterParams,
    },
    // number filters
    { field: 'sex', filter: 'agTextColumnFilter' },
    { field: 'age', filter: 'agNumberColumnFilter' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: true,
    sortable: true,
  };
  public rowData!: Character[];
  rowHeight: 120;
  public themeClass: string =
    "ag-theme-alpine";

  constructor(private tabService: TabService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.tabService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
      try
      {
        this.getList(response);
        this.rowData = this.characters;
      }
      catch(e)
      {
        console.log(e);
      }
    });
  }

  //Updates the list in the component
  refreshList(){
    try
    {
      this.characters = this.tabService.charactersGender;
      console.log(this.characters);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  //Checks the value of the response code passed from the tab services behaviour subject to perform actions accordingly
  getList(response: string){
    try
    {
      if (response === '200') { 
        this.isFetching = false;
        this.refreshList();
        console.log('List: ' + response)
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
            this.tabService.setResponseCode.next('200');
            this.ngOnInit();
            console.log(dialogResult);
          }
          else{
            this.router.navigate(['/', 'logout']);
          }
          
       });
      }
      else
      {
        this.isFetching = true;
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
