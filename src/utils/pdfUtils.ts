import { PDFDocument } from 'pdf-lib';

export const mergePDFs = async (pdfBytes1: Uint8Array, pdfBytes2: Uint8Array): Promise<Uint8Array> => {
    const pdfDoc1 = await PDFDocument.load(pdfBytes1);
    const pdfDoc2 = await PDFDocument.load(pdfBytes2);

    const mergedPdf = await PDFDocument.create();
    const copiedPages1 = await mergedPdf.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
    const copiedPages2 = await mergedPdf.copyPages(pdfDoc2, pdfDoc2.getPageIndices());

    copiedPages1.forEach((page) => mergedPdf.addPage(page));
    copiedPages2.forEach((page) => mergedPdf.addPage(page));

    return await mergedPdf.save();
};