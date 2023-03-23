import { launch } from "puppeteer";
import { DailyReportPdfTemplate } from "./templates/DailyReportPdfTemplate";
import { WeeklyReportPdfTemplate } from "./templates/WeeklyReportPdfTemplate";

export class PuppeteerPdfGenerator {
  public async generatePdf(
    template: DailyReportPdfTemplate | WeeklyReportPdfTemplate
  ): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    const html = template.getHTML();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf({
      landscape: template.isLandscape(),
    });
    console.log("Created buffer");

    return pdfBuffer;
  }
}
