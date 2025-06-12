import React, { useState } from 'react';
import PDFMerger from './components/PDFMerger';
import PDFViewer from './components/PDFViewer';

const App: React.FC = () => {
    const [mergedPDF, setMergedPDF] = useState<Blob | null>(null);

    const handleMergeComplete = (pdfBlob: Blob) => {
        setMergedPDF(pdfBlob);
    };

    return (
        <div>
            <h1>PDF Merger</h1>
            <PDFMerger onMergeComplete={handleMergeComplete} />
            {mergedPDF && <PDFViewer pdfBlob={mergedPDF} />}
        </div>
    );
};

export default App;