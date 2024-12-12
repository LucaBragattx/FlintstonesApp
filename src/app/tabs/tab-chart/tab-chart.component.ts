import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { TabService } from 'src/app/Shared/tab.service';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-tab-chart',
  templateUrl: './tab-chart.component.html',
  styleUrls: ['./tab-chart.component.css']
})
export class TabChartComponent implements OnInit, OnDestroy {
  dataSource: Object;
  chartConfig: Object;
  isFetching: boolean;
  alive: boolean = true;

  constructor(private tabService: TabService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    try
    {
      this.tabService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.getPost(response);
      })
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Sets the charts format and data
  setChart(){
    try
    {
      this.chartConfig = {
        width: '700',
        height: '400',
        type: 'pie2d',
        dataFormat: 'json',
      };
      
      this.dataSource = {
        "chart": {
          "caption": "Character Genders",
          "plottooltext": "<b>$percentValue</b> of Characters are $label",
          "showlegend": "1",
          "showpercentvalues": "1",
          "legendposition": "bottom",
          "usedataplotcolorforlabels": "1",
          "theme": "candy"
        },
        "data": [{
          "label": "Male",
          "value": this.tabService.count
        }, {
          "label": "Female",
          "value": this.tabService.count2
        }]
      };
    }
    catch(err)
    {
      console.log(err);
    }
  }

  //Checks the value of the response code passed from the tab services behaviour subject to perform actions accordingly
  getPost(response: string){
    try
    {
      if(response === '200')
      {
        this.isFetching = false;
        this.setChart();
        console.log('Chart set!');
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
        console.log('chart not set');
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
