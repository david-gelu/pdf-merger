import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

interface PDFMergerProps {
    onMergeComplete: (pdfBlob: Blob) => void;
}

const PDFMerger: React.FC<PDFMergerProps> = ({ onMergeComplete }) => {
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const mergePDFs = async () => {
        if (!file1 || !file2) {
            alert('Please select both PDF files');
            return;
        }

        try {
            setLoading(true);
            const mergedPdf = await PDFDocument.create();

            // Load the first PDF
            const pdf1Bytes = await file1.arrayBuffer();
            const pdf1Doc = await PDFDocument.load(pdf1Bytes);

            // Load the second PDF
            const pdf2Bytes = await file2.arrayBuffer();
            const pdf2Doc = await PDFDocument.load(pdf2Bytes);

            // Copy pages from the first PDF
            const pdf1Pages = await mergedPdf.copyPages(pdf1Doc, pdf1Doc.getPageIndices());
            pdf1Pages.forEach(page => mergedPdf.addPage(page));

            // Copy pages from the second PDF
            const pdf2Pages = await mergedPdf.copyPages(pdf2Doc, pdf2Doc.getPageIndices());
            pdf2Pages.forEach(page => mergedPdf.addPage(page));

            // Save the merged PDF
            const mergedPdfBytes = await mergedPdf.save();
            const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

            // Call the callback with the merged PDF blob
            onMergeComplete(blob);

            // Also save the file
            saveAs(blob, 'merged-document.pdf');
        } catch (error) {
            console.error('Error merging PDFs:', error);
            alert('Error merging PDFs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pdf-merger">
            <div className="input-group">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile1(e.target.files?.[0] || null)}
                />
                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile2(e.target.files?.[0] || null)}
                />
            </div>
            <button
                onClick={mergePDFs}
                disabled={loading || !file1 || !file2}
            >
                {loading ? 'Merging...' : 'Merge PDFs'}
            </button>
        </div>
    );
};

export default PDFMerger;