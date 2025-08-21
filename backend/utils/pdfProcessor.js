const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const createPreviewPdf = async (originalPdfPath, previewPdfPath, maxPages = 3) => {
  try {
    // Read the original PDF
    const originalPdfBytes = fs.readFileSync(originalPdfPath);
    const originalPdf = await PDFDocument.load(originalPdfBytes);
    
    // Create a new PDF for preview
    const previewPdf = await PDFDocument.create();
    
    // Get total pages and limit to maxPages
    const totalPages = originalPdf.getPageCount();
    const pagesToCopy = Math.min(totalPages, maxPages);
    
    // Copy first 3 pages to preview PDF
    const pageIndices = Array.from({ length: pagesToCopy }, (_, i) => i);
    const copiedPages = await previewPdf.copyPages(originalPdf, pageIndices);
    
    // Add pages to preview PDF
    copiedPages.forEach((page) => previewPdf.addPage(page));
    
    // Add watermark to preview pages
    const pages = previewPdf.getPages();
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText('PREVIEW - Purchase to view full content', {
        x: 50,
        y: height - 50,
        size: 12,
        opacity: 0.5,
      });
    });
    
    // Save preview PDF
    const previewPdfBytes = await previewPdf.save();
    fs.writeFileSync(previewPdfPath, previewPdfBytes);
    
    return {
      success: true,
      totalPages,
      previewPages: pagesToCopy
    };
  } catch (error) {
    console.error('Error creating preview PDF:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = { createPreviewPdf };