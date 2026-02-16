import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutProjectComponent } from './about-project.component';

describe('AboutUsComponent', () => {
  let component: AboutProjectComponent;
  let fixture: ComponentFixture<AboutProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutProjectComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
