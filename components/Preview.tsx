'use client';
import dynamic from 'next/dynamic';
import InvoicePdf from './InvoicePdf';
import { Spinner } from './ui/spinner';
import { useInvoiceStore } from '@/store/invoiceStore';

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Spinner className="size-8" />
  </div>
);

const BlobProvider = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.BlobProvider), {
  ssr: false,
  loading: () => <Loading />,
});

const Preview = () => {
  const workingDays = useInvoiceStore((state) => state.workingDays);

  return (
    <BlobProvider document={<InvoicePdf workingDays={workingDays} />}>
      {({ url, loading, error }) => {
        if (loading) {
          return <Loading />;
        }
        if (error) {
          return <div className="text-red-500">Error loading PDF preview</div>;
        }
        return <iframe src={url ?? undefined} className="w-full h-full" />;
      }}
    </BlobProvider>
  );
};

export default Preview;
