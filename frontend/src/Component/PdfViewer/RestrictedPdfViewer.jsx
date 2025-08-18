import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const RestrictedPdfViewer = ({ pdfUrl, onClose, isPurchased = false }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full mx-4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">PDF Preview</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="flex flex-col items-center">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} width={Math.min(600, window.innerWidth - 100)} />
            </Document>
            {numPages && (
              <div className="flex items-center gap-4 mt-4">
                <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
                <span className="text-sm">
                  Page {pageNumber} of {numPages > 4 && !isPurchased ? '4+' : numPages}
                  {!isPurchased && <span className="text-orange-600 ml-2">(Preview - First 4 pages only)</span>}
                </span>
                <button 
                  onClick={goToNextPage} 
                  disabled={pageNumber >= numPages || (!isPurchased && pageNumber >= 4)} 
                  className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictedPdfViewer;