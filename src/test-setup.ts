import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { beforeEach } from 'vitest';

TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideZonelessChangeDetection()],
  });
});
