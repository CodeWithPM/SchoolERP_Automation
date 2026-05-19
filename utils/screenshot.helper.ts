import * as fs from 'fs';
import * as path from 'path';
import type { Page } from '@playwright/test';
import { Logger } from './logger';

export class ScreenshotHelper {
  private readonly dir = path.resolve(process.cwd(), 'screenshots');
  constructor(private readonly page: Page) {
    if (!fs.existsSync(this.dir)) fs.mkdirSync(this.dir, { recursive: true });
  }
  async capture(name: string): Promise<string> {
    const filePath = path.join(this.dir, `${name.replace(/\W+/g, '_')}-${Date.now()}.png`);
    new Logger('Screenshot').step(`Capturing ${filePath}`);
    await this.page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }
}
