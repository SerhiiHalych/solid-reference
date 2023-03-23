import { AbstractPdfTemplate } from "./templates/AbstractPdfTemplate";

export interface IPdfHandler {
  generatePdf<TPayload>(
    template: AbstractPdfTemplate<TPayload>
  ): Promise<Buffer>;
  sendPdf(fileData: Buffer): Promise<void>;
}
