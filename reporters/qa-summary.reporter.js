const fs = require('fs');
const path = require('path');

class QaSummaryReporter {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.defects = [];
    this.uiIssues = [];
    this.responsiveIssues = [];
  }

  onTestEnd(test, result) {
    this.total++;
    if (result.status === 'passed') this.passed++;
    else if (result.status === 'skipped') this.skipped++;
    else this.failed++;

    if (result.status !== 'passed') {
      const title = test.title;
      const screenshot = result.attachments.find((a) => a.name === 'screenshot')?.path ?? 'N/A';
      this.defects.push({ id: `DEF-${String(this.defects.length + 1).padStart(3, '0')}`, module: 'Aadhaar Card Details', steps: title, expected: 'Pass', actual: result.error?.message ?? result.status, severity: title.includes('SMK-') ? 'Critical' : 'Major', priority: 'High', screenshot });
      if (title.includes('UI-')) this.uiIssues.push(`${title}: ${result.error?.message ?? result.status}`);
      if (title.includes('RESP-')) this.responsiveIssues.push(`${title}: ${result.error?.message ?? result.status}`);
    }
  }

  onEnd(result) {
    const dir = path.resolve(process.cwd(), 'reports');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const summary = { totalTestCases: this.total, passed: this.passed, failed: this.failed, skipped: this.skipped, blocked: 0, passRate: this.total ? `${((this.passed / this.total) * 100).toFixed(1)}%` : '0%', overallStatus: result.status, uiIssues: this.uiIssues, responsiveIssues: this.responsiveIssues };
    const md = `# QA Summary Report\n\n| Metric | Count |\n|--------|-------|\n| Total | ${summary.totalTestCases} |\n| Passed | ${summary.passed} |\n| Failed | ${summary.failed} |\n| Skipped | ${summary.skipped} |\n| Pass Rate | ${summary.passRate} |\n\n## UI Issues\n${this.uiIssues.map((i) => `- ${i}`).join('\n') || '- None'}\n\n## Responsive Issues\n${this.responsiveIssues.map((i) => `- ${i}`).join('\n') || '- None'}\n`;
    const defects = this.defects.length ? this.defects.map((d) => `## ${d.id}\n- Steps: ${d.steps}\n- Actual: ${d.actual}\n- Screenshot: ${d.screenshot}\n`).join('\n') : 'No defects.\n';
    fs.writeFileSync(path.join(dir, 'qa-summary.json'), JSON.stringify(summary, null, 2));
    fs.writeFileSync(path.join(dir, 'QA-SUMMARY-REPORT.md'), md);
    fs.writeFileSync(path.join(dir, 'DEFECT-REPORT.md'), `# Defect Report\n\n${defects}`);
    console.log(`\nQA Summary: ${summary.passed}/${summary.totalTestCases} passed\n`);
  }
}

module.exports = QaSummaryReporter;
