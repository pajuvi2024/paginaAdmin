import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProserPage } from './proser.page';

describe('ProserPage', () => {
  let component: ProserPage;
  let fixture: ComponentFixture<ProserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
