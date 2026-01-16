import InvoiceForm from '@/components/InvoiceForm';
import Preview from '@/components/Preview';

export default function Home() {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/3 flex flex-col items-center justify-center p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-black/45">Welcome to the Email Sender App</h1>
        <InvoiceForm />
      </div>
      <div className="w-2/3">
        <Preview />
      </div>
    </div>
  );
}
