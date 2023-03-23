import { writeFile } from "fs";
import { DailyReportPdfTemplate } from "./templates/DailyReportPdfTemplate";
import { IPdfHandler } from "./IPdfHandler";
import { WeeklyReportPdfTemplate } from "./templates/WeeklyReportPdfTemplate";

export class ReportService {
  constructor(private pdfHandler: IPdfHandler) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPdfTemplate({
      date,
      totalNumber,
    });

    const pdfBuffer = await this.pdfHandler.generatePdf(template);

    await this.pdfHandler.sendPdf(pdfBuffer);
  }

  public async createWeeklyReport(
    dateFrom: Date,
    dateTo: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new WeeklyReportPdfTemplate({
      dateFrom,
      dateTo,
      totalNumber,
    });

    const pdfBuffer = await this.pdfHandler.generatePdf(template);

    await this.pdfHandler.sendPdf(pdfBuffer);
  }
}
