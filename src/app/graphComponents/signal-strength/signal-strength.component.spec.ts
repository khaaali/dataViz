/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { MySqlService } from '../../app.service';
import { RouterTestingModule } from '@angular/router/testing';

import { SignalStrengthComponent } from './signal-strength.component';

describe('SignalStrengthComponent', () => {
  let component: SignalStrengthComponent;
  let fixture: ComponentFixture<SignalStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule,HttpModule ],
      declarations: [ SignalStrengthComponent ],
      providers: [MySqlService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
