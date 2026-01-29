'use client';

import { sendEmail } from '@/app/actions/email';
import { getWorkingDaysInMonth } from '@/lib/utils';
import { useInvoiceStore } from '@/store/invoiceStore';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { ArrowRight, Building2, Mail, Wifi } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import { Button } from './ui/button';
import { Field, FieldLabel } from './ui/field';
import { Input } from './ui/input';

const invoiceSchema = z.object({
  recipient: z.email('Email invalide'),
  workingDays: z.number().min(1).max(23),
});

const InvoiceForm = () => {
  const setWorkingDays = useInvoiceStore((state) => state.setWorkingDays);

  const month = dayjs().format('MM');
  const year = dayjs().format('YYYY');

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      recipient: 'zoandrianambinina@gmail.com',
      workingDays: getWorkingDaysInMonth(year, month),
    },
  });

  const watchedWorkingDays = useWatch({
    control: form.control,
    name: 'workingDays',
  });

  useEffect(() => {
    setWorkingDays(watchedWorkingDays);
  }, [watchedWorkingDays, setWorkingDays]);

  const onSubmit = async (data: z.infer<typeof invoiceSchema>) => {
    const values = {
      recipient: data.recipient,
      workingDays: Number(data.workingDays),
    };
    await sendEmail(values);
  };

  return (
    <form id="invoice-form" className="flex flex-col flex-1 overflow-y-auto" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-1 overflow-y-auto px-8 py-2 space-y-8">
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Destinataire</h2>
          <Controller
            name="recipient"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="group">
                  <FieldLabel htmlFor="invoice-form-recipient" className="block text-sm font-medium text-gray-700 mb-2">
                    Email du client
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <Input
                      {...field}
                      id="invoice-form-recipient"
                      aria-invalid={fieldState.invalid}
                      placeholder="nom@exemple.com"
                      autoComplete="off"
                      className="w-full pl-11 pr-4 py-6 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>
              </Field>
            )}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Société</label>
            <div className="relative flex items-center">
              <i data-lucide="building-2" className=""></i>
              <Building2 className="absolute left-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value="SARL LEVEA"
                readOnly
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base text-gray-500 cursor-not-allowed shadow-sm"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-100" />

        <div className="space-y-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest">Détails Prestation</h2>
          <div>
            <Controller
              name="workingDays"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-baseline">
                    <FieldLabel htmlFor="invoice-form-working-days" className="block text-sm font-medium text-gray-700">
                      Nombre de jour
                    </FieldLabel>
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Janvier 2026</span>
                  </div>
                  <Input
                    {...field}
                    type="number"
                    id="invoice-form-working-days"
                    aria-invalid={fieldState.invalid}
                    placeholder="1"
                    autoComplete="off"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full text-center py-6 bg-white border border-gray-200 rounded-lg text-lg font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all shadow-sm"
                  />
                </Field>
              )}
            />
            <p className="mt-2 text-sm text-gray-500">
              Taux journalier: <span className="font-medium text-gray-900">65,00 €</span>
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-white hover:border-gray-300 transition-colors cursor-pointer group">
            <div className="relative flex items-center mt-1">
              <Wifi />
            </div>
            <div className="flex-1">
              <span className="block text-base font-medium text-gray-900">Forfait Fibre Optique</span>
              <span className="block text-sm text-gray-500">Ajoute 70€ au total</span>
            </div>
            <span className="text-base font-medium text-gray-900">70€</span>
          </div>
        </div>
      </div>
      <div className="shrink-0 p-8 border-t border-gray-200 w-full">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">Total estimé</span>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">1 500,00 €</span>
        </div>
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white text-base font-medium py-6 rounded-lg shadow-lg shadow-gray-900/10 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
          <span>Envoyer la facture</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;
