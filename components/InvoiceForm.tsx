'use client';

import { sendEmail } from '@/app/actions/email';
import { getWorkingDaysInMonth } from '@/lib/utils';
import { useInvoiceStore } from '@/store/invoiceStore';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import z from 'zod';
import Preview from './Preview';
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
    <div className="flex flex-row h-screen">
      <div className="w-1/3 flex flex-col items-center justify-center p-8 bg-gray-100 gap-6">
        <h1 className="text-4xl font-bold text-black/45">Welcome to the Email Sender App</h1>
        <form id="invoice-form" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="recipient"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="invoice-form-recipient">Récépteur</FieldLabel>
                <Input
                  {...field}
                  id="invoice-form-recipient"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
              </Field>
            )}
          />
          <Controller
            name="workingDays"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="invoice-form-working-days">Nombre de jour</FieldLabel>
                <Input
                  {...field}
                  type="number"
                  id="invoice-form-working-days"
                  aria-invalid={fieldState.invalid}
                  placeholder="1"
                  autoComplete="off"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </Field>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Send Email
          </Button>
        </form>
      </div>
      <div className="w-2/3">
        <Preview />
      </div>
    </div>
  );
};

export default InvoiceForm;
