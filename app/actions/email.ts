'use server';

import InvoicePdf from '@/components/InvoicePdf';
import { DocumentProps, renderToBuffer } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import fs from 'fs/promises';
import path from 'path';
import { createElement, ReactElement } from 'react';
import { Resend } from 'resend';
import { createInvoice, uploadInvoice } from './invoice';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(values: { recipient: string; workingDays: number }) {
  try {
    const pdfBuffer = await renderToBuffer(createElement(InvoicePdf, { workingDays: values.workingDays }) as ReactElement<DocumentProps>);

    const year = dayjs().format('YYYY');
    const month = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);
    const filename = `Levea_Zo_Andrianambinina_Facture_${month}_${year}`;

    const secureUrl = await uploadInvoice(pdfBuffer, filename);
    await createInvoice(secureUrl, month.toLowerCase());

    const ribPdfPath = path.join(process.cwd(), 'public/assets/rib.pdf');
    const ribPdfBuffer = await fs.readFile(ribPdfPath);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: values.recipient,
      subject: `Facture - ${month} ${year} | Zo Andrianambinina`,
      html: `
        <p>Bonjour,</p>
        <p>Veuillez trouver en pièce jointe ma facture pour le mois de ${month} ${year}.</p>
        <p>Cordialement,</p>
        <p>Zo Andrianambinina</p>
      `,
      attachments: [
        {
          filename: `${filename}.pdf`,
          content: pdfBuffer,
        },
        {
          filename: 'Informations_Bancaires_Zo_Andrianambinina.pdf',
          content: ribPdfBuffer,
        },
      ],
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
