import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Media3DComponent } from './media3-d.component';

describe('Media3DComponent', () => {
  let component: Media3DComponent;
  let fixture: ComponentFixture<Media3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Media3DComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Media3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
