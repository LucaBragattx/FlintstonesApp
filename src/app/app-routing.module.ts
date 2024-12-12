import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character/character-list/character-list.component';
import { CharacterComponent } from './character/character.component';
import { CharacterNewComponent } from './character/character-new/character-new.component';
import { CharacterDetailComponent } from './character/character-detail/character-detail.component';
import { CharacterUpdateComponent } from './character/character-update/character-update.component';
import { CharacterDeleteComponent } from './character-delete/character-delete.component';
import { GridComponent } from './grid/grid.component';
import { ChartComponent } from './chart/chart.component';
import { TabsComponent } from './tabs/tabs.component';
import { UserLogoutComponent } from './user/user-logout/user-logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: CharacterComponent},
  { path: 'list', component: CharacterListComponent, children: [
    //{ path: ':id', component: CharacterDetailComponent},
  ] },
  { path: 'new', component: CharacterNewComponent},
  { path: 'grid', component: GridComponent},
  { path: 'chart', component: ChartComponent},
  { path: 'tabs', component: TabsComponent},
  { path: 'logout', component: UserLogoutComponent},
   { path: 'list/:id', component: CharacterDetailComponent},
   { path: 'update/:id', component: CharacterUpdateComponent},
   { path: 'delete/:id', component: CharacterDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
