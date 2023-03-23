import { AbstractPdfTemplate } from "../templates/AbstractPdfTemplate";

export interface IPdfGenerator {
  generatePdf<TPayload>(
    template: AbstractPdfTemplate<TPayload>
  ): Promise<Buffer>;
}
