import { writeFile } from "fs";
import { DailyReportPdfTemplate } from "./templates/DailyReportPdfTemplate";
import { PuppeteerPdfGenerator } from "./PuppeteerPdfGenerator";
import { WeeklyReportPdfTemplate } from "./templates/WeeklyReportPdfTemplate";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPdfGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPdfTemplate(date, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePdf(template);

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

    const template = new WeeklyReportPdfTemplate(dateFrom, dateTo, totalNumber);

    const pdfBuffer = await this.pdfGenerator.generatePdf(template);

    await new Promise((resolve) =>
      writeFile("./weeklyReport.pdf", pdfBuffer, resolve)
    );
  }
}
