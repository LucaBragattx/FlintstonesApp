import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColDef, ISetFilterParams } from 'ag-grid-community';
import { Character } from '../character/character.model';
import { BusinessLayerService } from '../Shared/business-layer.service';
import { Subscription } from 'rxjs';
import { GridOptionsComponent } from '../grid-options/grid-options.component';
import { takeWhile } from 'rxjs/operators';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  characters: Character[] = [];
  isFetching: boolean;
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
    { field: 'options', cellRendererFramework: GridOptionsComponent},
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: true,
    sortable: true,
  };
  public rowData!: Character[];
  rowHeight = 50;
  public themeClass: string =
    "ag-theme-alpine";

  constructor(private businessService: BusinessLayerService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    try
    {
      this.businessService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.getList(response);
        this.rowData = this.characters;
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

  //Checks the value of the response code passed from the business services behaviour subject to perform actions accordingly
  getList(response: string){
    try
    {
      if (response === '200') { 
        this.isFetching = false;
        // this.businessService.fetched = true;
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
            this.businessService.setResponseCode.next('200');
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
    catch(e)
    {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    // this.businessService.resetCode();
    this.alive = false;
  }
}
