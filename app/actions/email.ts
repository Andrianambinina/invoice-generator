'use server';

import InvoicePdf from '@/components/InvoicePdf';
import { DocumentProps, renderToBuffer } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { createElement, ReactElement } from 'react';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(values: { recipient: string; workingDays: number }) {
  try {
    const pdfBuffer = await renderToBuffer(createElement(InvoicePdf, { workingDays: values.workingDays }) as ReactElement<DocumentProps>);

    const year = dayjs().format('YYYY');
    const month = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);
    const filename = `Levea_Zo_Andrianambinina_Facture_${month}_${year}.pdf`;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: values.recipient,
      subject: `Facture Zo Andrianambinina mois de ${month} ${year}`,
      html: `<p>Bonjour,</p><p>Veuillez trouver ci-joint ma facture pour le mois de ${month} ${year}.</p><p>Cordialement,</p><p>Zo Andrianambinina</p>`,
      attachments: [
        {
          filename: filename,
          content: pdfBuffer,
        },
      ],
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
