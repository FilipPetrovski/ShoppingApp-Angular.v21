import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCarouselComponent } from './image-carousel.component';

describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;
  const mockImages = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('images', mockImages);
    fixture.detectChanges();
  });

  it('should initialize with currentIndex at 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('should increment index on next()', () => {
    const event = new MouseEvent('click');
    component.next(event);
    expect(component.currentIndex()).toBe(1);
  });

  it('should wrap to 0 when next() is called on the last image', () => {
    const event = new MouseEvent('click');

    component.currentIndex.set(2);

    component.next(event);
    expect(component.currentIndex()).toBe(0);
  });

  it('should wrap to last index when prev() is called on index 0', () => {
    const event = new MouseEvent('click');
    component.prev(event);
    expect(component.currentIndex()).toBe(2);
  });

  it('should stop event propagation when calling navigation methods', () => {
    const event = new MouseEvent('click');
    vi.spyOn(event, 'stopPropagation');

    component.next(event);
    expect(event.stopPropagation).toHaveBeenCalled();

    component.prev(event);
    expect(event.stopPropagation).toHaveBeenCalledTimes(2);
  });
});
