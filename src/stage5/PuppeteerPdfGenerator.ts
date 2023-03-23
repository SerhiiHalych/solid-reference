import { launch } from "puppeteer";
import { AbstractPdfTemplate } from "./templates/AbstractPdfTemplate";

export class PuppeteerPdfGenerator {
  public async generatePdf<TPayload>(
    template: AbstractPdfTemplate<TPayload>
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
