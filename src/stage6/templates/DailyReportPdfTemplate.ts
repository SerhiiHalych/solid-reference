import { AbstractPdfTemplate } from "./AbstractPdfTemplate";

interface DailyReportPdfTemplatePayload {
  date: Date;
  totalNumber: number;
}

export class DailyReportPdfTemplate extends AbstractPdfTemplate<
  DailyReportPdfTemplatePayload
> {
  protected readonly _landscape = true;

  constructor(params: DailyReportPdfTemplatePayload) {
    super(params);
  }

  public getHTML(): string {
    return `
      <div>Date: ${this._params.date}</div>
      <div>Total number: ${this._params.totalNumber}</div>
    `;
  }
}
