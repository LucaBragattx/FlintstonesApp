import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { FusionChartsModule } from 'angular-fusioncharts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CharacterComponent } from './character/character.component';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { CharacterItemComponent } from './character/character-list/character-item/character-item.component';
import { CharacterService } from './character/character.service';
import { CharacterNewComponent } from './character/character-new/character-new.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { CharacterUpdateComponent } from './character/character-update/character-update.component';
import { DataStorageService } from './character/data-storage.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { BusinessLayerService } from './Shared/business-layer.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { CharacterDeleteComponent } from './character-delete/character-delete.component';
import { GridComponent } from './grid/grid.component';
import { ChartComponent } from './chart/chart.component';
import { GridOptionsComponent } from './grid-options/grid-options.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';

import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { TabsComponent } from './tabs/tabs.component';
import { TabService } from './Shared/tab.service';
import { TabGenderComponent } from './tabs/tab-gender/tab-gender.component';
import { TabChartComponent } from './tabs/tab-chart/tab-chart.component';
import { TabFirstComponent } from './tabs/tab-first/tab-first.component';
import { TabLetterComponent } from './tabs/tab-letter/tab-letter.component';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharacterComponent,
    CharacterListComponent,
    CharacterItemComponent,
    CharacterNewComponent,
    CharacterDetailComponent,
    CharacterUpdateComponent,
    AlertDialogComponent,
    SpinnerComponent,
    CharacterDeleteComponent,
    GridComponent,
    ChartComponent,
    GridOptionsComponent,
    TabsComponent,
    TabGenderComponent,
    TabChartComponent,
    TabFirstComponent,
    TabLetterComponent,
    UserLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AgGridModule,
    FusionChartsModule,
  ],
  providers: [CharacterService, DataStorageService, BusinessLayerService, TabService],
  bootstrap: [AppComponent]
})
export class AppModule { }
