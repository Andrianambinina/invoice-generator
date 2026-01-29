'use server';

import InvoicePdf from '@/components/InvoicePdf';
import { DocumentProps, renderToBuffer } from '@react-pdf/renderer';
import { v2 as cloudinary } from 'cloudinary';
import dayjs from 'dayjs';
import { createElement, ReactElement } from 'react';
import { Resend } from 'resend';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(values: { recipient: string; workingDays: number }) {
  try {
    const pdfBuffer = await renderToBuffer(createElement(InvoicePdf, { workingDays: values.workingDays }) as ReactElement<DocumentProps>);

    const year = dayjs().format('YYYY');
    const month = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);
    const filename = `Levea_Zo_Andrianambinina_Facture_${month}_${year}`;

    // updload invoice PDF into Cloudinary
    await uploadInvoicePdf(pdfBuffer, filename);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: values.recipient,
      subject: `Facture Zo Andrianambinina mois de ${month} ${year}`,
      html: `<p>Bonjour,</p><p>Veuillez trouver ci-joint ma facture pour le mois de ${month} ${year}.</p><p>Cordialement,</p><p>Zo Andrianambinina</p>`,
      attachments: [
        {
          filename: `${filename}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function uploadInvoicePdf(pdfBuffer: Buffer, fileName: string) {
  const base64Pdf = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64Pdf, {
    resource_type: 'image',
    public_id: `factures/${fileName}`,
    format: 'pdf',
  });

  return result.secure_url;
}
