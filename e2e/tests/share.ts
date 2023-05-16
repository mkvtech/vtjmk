import { readFile } from 'fs/promises'
import pdf, { Result as PdfResult } from 'pdf-parse'

export async function readPdf(filePath: string): Promise<PdfResult> {
  const file = await readFile(filePath)
  return pdf(file)
}
