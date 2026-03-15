const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const filePath = 'file:///' + path.resolve(__dirname, 'report.html').replace(/\\/g, '/');
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for fonts/animations
    await new Promise(r => setTimeout(r, 2000));

    await page.pdf({
        path: 'RACE_PHASE2_MCQ_Report.pdf',
        format: 'A4',
        printBackground: true,
        margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' },
        displayHeaderFooter: true,
        headerTemplate: `<div style="font-size:9px;color:#888;width:100%;text-align:center;font-family:Inter,sans-serif;padding:4px 0">
      RACE PHASE 2 — SESSION MCQ TEST · Confidential Report
    </div>`,
        footerTemplate: `<div style="font-size:9px;color:#888;width:100%;text-align:center;font-family:Inter,sans-serif;padding:4px 0">
      Generated 02 March 2026 · Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>`,
    });

    await browser.close();
    console.log('✅ PDF saved: RACE_PHASE2_MCQ_Report.pdf');
})();
