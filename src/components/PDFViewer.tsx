import React, { useEffect, useState } from 'react';

interface PDFViewerProps {
    pdfBlob: Blob;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfBlob }) => {
    const [pdfUrl, setPdfUrl] = useState<string>('');

    useEffect(() => {
        // Create a URL for the blob
        const url = URL.createObjectURL(pdfBlob);
        setPdfUrl(url);

        // Cleanup the URL when component unmounts
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [pdfBlob]);

    return (
        <div className="pdf-viewer">
            <h2>Preview</h2>
            <iframe
                src={pdfUrl}
                title="PDF Preview"
                width="100%"
                height="600px"
                style={{ border: '1px solid #ccc' }}
            />
        </div>
    );
};

export default PDFViewer;