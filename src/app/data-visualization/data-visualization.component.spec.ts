/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../app.service';
import { RouterTestingModule } from '@angular/router/testing';
import {TemperatureComponent} from "../graphComponents/temperature-component/temperature.component"
import {InclinationComponent} from "../graphComponents/inclination-component/inclination.component"
import {PacketLossComponent}  from "../graphComponents/packet-loss/packet-loss.component"
import {SignalStrengthComponent}  from "../graphComponents/signal-strength/signal-strength.component"
import {VoltageLevelsComponent}  from "../graphComponents/voltage-levels/voltage-levels.component"


import { DataVisualizationComponent } from './data-visualization.component';

describe('DataVisualizationComponent', () => {
  let component: DataVisualizationComponent;
  let fixture: ComponentFixture<DataVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,HttpModule],
      declarations: [ DataVisualizationComponent,TemperatureComponent,InclinationComponent,
      PacketLossComponent,SignalStrengthComponent,VoltageLevelsComponent ],
      providers: [MySqlService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
