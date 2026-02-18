import { TestBed } from '@angular/core/testing';
import { ContactMeComponent } from './contact-me.component';

describe('ContactMeComponent', () => {
  let component: ContactMeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMeComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactMeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component instance successfully', () => {
    expect(component).toBeTruthy();
  });
});
