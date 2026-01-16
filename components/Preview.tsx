'use client';

import dynamic from 'next/dynamic';
import InvoicePdf from './InvoicePdf';

const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Preview = () => {
  return (
    <PDFViewer className="w-full h-full">
      <InvoicePdf />
    </PDFViewer>
  );
};

export default Preview;
