export interface ISender {
  sendFile(fileData: Buffer): Promise<void>;
}
