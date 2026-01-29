import InvoiceForm from '@/components/InvoiceForm';
import Preview from '@/components/Preview';
import { Download, Send } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-full overflow-hidden flex selection:bg-gray-900 selection:text-white antialiased">
      <aside className="w-full md:w-105 bg-white border-r border-gray-200 flex flex-col shrink-0 relative z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              <Send />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900">Invoice Generator</h1>
          </div>
          <p className="text-base text-gray-500 leading-relaxed">
            Configurez les détails de la facture avant l&#39;envoi. La prévisualisation se met à jour automatiquement.
          </p>
        </div>
        <InvoiceForm />
      </aside>

      <main className="flex-1 flex flex-col bg-[#F3F4F6] relative overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Prêt à envoyer
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-all shadow-sm">
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </button>
          </div>
        </header>
        <Preview />
      </main>
    </div>
  );
}
