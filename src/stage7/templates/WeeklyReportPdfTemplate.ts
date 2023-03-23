import { AbstractPdfTemplate } from "./AbstractPdfTemplate";

interface WeeklyReportPdfTemplatePayload {
  dateFrom: Date;
  dateTo: Date;
  totalNumber: number;
}

export class WeeklyReportPdfTemplate extends AbstractPdfTemplate<
  WeeklyReportPdfTemplatePayload
> {
  protected readonly _landscape = false;

  constructor(params: WeeklyReportPdfTemplatePayload) {
    super(params);
  }

  public getHTML(): string {
    return `
      <div>Date from: ${this._params.dateFrom}</div>
      <div>Date to: ${this._params.dateTo}</div>
      <div>Total number: ${this._params.totalNumber}</div>
    `;
  }
}
