import { DataViszPage } from './app.po';
import { HttpModule }    from '@angular/http';

import { ActivatedRoute, Params,Router } from '@angular/router';

import { MySqlService } from '../src/app/app.service';


describe('data-visz App', function() {
  let page: DataViszPage;

  beforeEach(() => {
    page = new DataViszPage();
    
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page).toBeTruthy();
  });
});
