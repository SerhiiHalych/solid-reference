import { writeFile } from "fs";
import { DailyReportPdfTemplate } from "./templates/DailyReportPdfTemplate";
import { ISender } from "./senders/ISender";
import { WeeklyReportPdfTemplate } from "./templates/WeeklyReportPdfTemplate";
import { IPdfGenerator } from "./pdfGenerators/IPdfGenerator";

export class ReportService {
  constructor(private pdfGenerator: IPdfGenerator, private sender: ISender) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const template = new DailyReportPdfTemplate({
      date,
      totalNumber,
    });

    const pdfBuffer = await this.pdfGenerator.generatePdf(template);

    await this.sender.sendFile(pdfBuffer);
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

    const pdfBuffer = await this.pdfGenerator.generatePdf(template);

    await this.sender.sendFile(pdfBuffer);
  }
}
