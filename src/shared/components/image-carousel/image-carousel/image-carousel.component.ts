import { Component, input, signal } from '@angular/core';

@Component({
    selector: 'pg-image-carousel',
    imports: [],
    templateUrl: './image-carousel.component.html',
})
export class ImageCarouselComponent {
    images = input.required<string[]>();
    currentIndex = signal(0);

    next(event: Event) {
        event.stopPropagation();
        this.currentIndex.update((i) => (i + 1) % this.images().length);
    }

    prev(event: Event) {
        event.stopPropagation();
        this.currentIndex.update((i) => (i - 1 + this.images().length) % this.images().length);
    }
}
