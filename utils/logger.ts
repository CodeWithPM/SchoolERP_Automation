export class Logger {
  constructor(private readonly context: string) {}
  step(message: string): void {
    console.log(`[${new Date().toISOString()}] [${this.context}] STEP: ${message}`);
  }
  info(message: string): void {
    console.log(`[${this.context}] INFO: ${message}`);
  }
  warn(message: string): void {
    console.warn(`[${this.context}] WARN: ${message}`);
  }
}
