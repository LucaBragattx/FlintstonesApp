import { Component, OnInit } from '@angular/core';
import { BusinessLayerService } from '../Shared/business-layer.service';
import { Character } from '../character/character.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  dataSource: Object;
  chartConfig: Object;
  characters: Character[] = [];
  item : Character;
  count: number = 0;
  count2: number = 0;


  constructor(private businessService: BusinessLayerService) {

  }

  ngOnInit(): void {
    try
    {
      //Initilizes tje charts format and data
      this.characters = this.businessService.characters;
      console.log(this.characters);
      this.countAges(this.characters);
      this.chartConfig = {
      width: '700',
      height: '400',
      type: 'column2d',
      dataFormat: 'json',
      };
      this.dataSource = {
        "chart": {
          "caption": "Character Ages",
          "subCaption": "Comparison between character ages",
          "xAxisName": "Age",
          "yAxisName": "Count",
          "theme": "candy",
        },
        "data": [{
          "label": "0-50",
          "value": this.count2
        }, {
          "label": "50+",
          "value": this.count
        }]
      };
    }
    catch(e)
    {
      console.log(e);
    }

  }

  //Used to count the ages of all the characters and seperates them by ages above 50 and below 50
  countAges(characters: Character[]){
    try
    {
      for (let i = 0; i < characters.length; i++) {
        if(characters[i].age >= 50)
        {
          this.count++;
        }
        else{
          this.count2++;
        }
      }
      console.log(this.count);
      console.log(this.count2);
    }
    catch(e)
    {
      console.log(e);
    }
  }

}
