import { launch } from "puppeteer";
import * as fs from "fs";
import axios from "axios";
import * as util from "util";
import { AbstractPdfTemplate } from "./templates/AbstractPdfTemplate";
import { IPdfHandler } from "./IPdfHandler";

const stat = util.promisify(fs.stat);

export class PuppeteerPdfGenerator implements IPdfHandler {
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

  public async sendPdf(fileData: Buffer): Promise<void> {
    const readStream = fs.createReadStream(fileData);
    const { size } = await stat(fileData);

    await axios({
      method: "POST",
      url: "https://google-drive.com/api/reports",
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": size,
        Authorization: "secret token",
      },
      data: readStream,
    });
  }
}
