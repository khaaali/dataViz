import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { TemperatureAndInclinationComponent } from './graphComponents/tempIncli-component/tempIncliComponent';
import { MySqlService }   from './app.service';
import { TemperatureComponent } from './graphComponents/temperature-component/temperature.component';
import { InclinationComponent } from './graphComponents/inclination-component/inclination.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { HelpComponent } from './help/help.component';
import { DataVisualizationComponent } from './data-visualization/data-visualization.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'settings',component: SettingsComponent },
  { path: 'help',component: HelpComponent },
  { path: 'dataVisualization',component: DataVisualizationComponent },
  { path: 'mac/:id',component: DataVisualizationComponent },
  { path: '**',component: HomeComponent },
];




@NgModule({
  declarations: [
    AppComponent,
    TemperatureAndInclinationComponent,
    TemperatureComponent,
    InclinationComponent,
    HomeComponent,
    SettingsComponent,
    HelpComponent,
    DataVisualizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MySqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }





