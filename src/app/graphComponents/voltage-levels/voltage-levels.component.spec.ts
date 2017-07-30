/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import { RouterTestingModule } from '@angular/router/testing';

import { VoltageLevelsComponent } from './voltage-levels.component';

describe('VoltageLevelsComponent', () => {
  let component: VoltageLevelsComponent;
  let fixture: ComponentFixture<VoltageLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,HttpModule ],
      declarations: [ VoltageLevelsComponent ],
      providers: [MySqlService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoltageLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
