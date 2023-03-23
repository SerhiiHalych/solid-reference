import { launch } from "puppeteer";
import { weeklyReportPdfTemplate } from "./WeeklyReportPdfTemplate";
import { dailyReportTemplate } from "./DailyReportPdfTemplate";

export class PuppeteerPdfGenerator {
  public async generateDailyReport(date: Date, totalNumber: number) {
    const html = dailyReportTemplate(date, totalNumber);

    return this.generatePdf(html);
  }

  public async generateWeeklyReport(
    dateFrom: Date,
    dateTo: Date,
    totalNumber: number
  ) {
    const html = weeklyReportPdfTemplate(dateFrom, dateTo, totalNumber);

    return this.generatePdf(html);
  }

  private async generatePdf(html: string): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf();
    console.log("Created buffer");

    return pdfBuffer;
  }
}
