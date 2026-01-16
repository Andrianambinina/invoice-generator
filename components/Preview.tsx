'use client';

import dynamic from 'next/dynamic';
import InvoiceDocument from './InvoiceDocument';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Preview = () => {
  return (
    <PDFViewer className="w-full h-full">
      <InvoiceDocument />
    </PDFViewer>
  );
};

export default Preview;
