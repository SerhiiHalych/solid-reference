import { writeFile } from "fs";
import { PuppeteerPdfGenerator } from "./PuppeteerPdfGenerator";

export class ReportService {
  constructor(private pdfGenerator: PuppeteerPdfGenerator) {}

  public async createDailyReport(
    date: Date,
    totalNumber: number
  ): Promise<void> {
    // save report to DB

    const pdfBuffer = await this.pdfGenerator.generateDailyReport(
      date,
      totalNumber
    );

    await new Promise((resolve) =>
      writeFile("./dailyReport.pdf", pdfBuffer, resolve)
    );
  }
}
