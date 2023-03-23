import { writeFile } from "fs";
import { dailyReportTemplate } from "./templates/DailyReportPdfTemplate";
import { PuppeteerPdfGenerator } from "./PuppeteerPdfGenerator";
import { weeklyReportPdfTemplate } from "./templates/WeeklyReportPdfTemplate";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPdfGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const html = dailyReportTemplate(date, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePdf(html, true);

    await new Promise((resolve) =>
      writeFile("./dailyReport.pdf", pdfBuffer, resolve)
    );
  }

  public async createWeeklyReport(
    dateFrom: Date,
    dateTo: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const html = weeklyReportPdfTemplate(dateFrom, dateTo, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePdf(html, false);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );
  }
}
