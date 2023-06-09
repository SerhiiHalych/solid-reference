import { launch } from "puppeteer";

export class PuppeteerPdfGenerator {
  public async generatePdf(html: string, landscape: boolean): Promise<Buffer> {
    const browser = await launch();

    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer: Buffer = await page.pdf({ landscape });
    console.log("Created buffer");

    return pdfBuffer;
  }
}
