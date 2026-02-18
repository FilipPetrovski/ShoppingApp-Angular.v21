import { TestBed } from '@angular/core/testing';
import { AboutProjectComponent } from './about-project.component';

describe('AboutProjectComponent', () => {
  let component: AboutProjectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutProjectComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(AboutProjectComponent);
    component = fixture.componentInstance;
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });
});
