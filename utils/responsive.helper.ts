import { expect, type Page } from '@playwright/test';
import { Logger } from './logger';

export interface ViewportSize { width: number; height: number; }

export class ResponsiveHelper {
  constructor(private readonly page: Page) {}
  async setViewport(viewport: ViewportSize): Promise<void> {
    new Logger('Responsive').step(`Viewport ${viewport.width}x${viewport.height}`);
    await this.page.setViewportSize(viewport);
  }
  async assertNoHorizontalOverflow(): Promise<void> {
    const hasOverflow = await this.page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);
  }
}
