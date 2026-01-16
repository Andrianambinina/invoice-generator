import InvoicePdf from '@/components/InvoicePdf';
import { renderToBuffer } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { Resend } from 'resend';

export async function POST() {
  try {
    const pdfBuffer = await renderToBuffer(createElement(InvoicePdf));

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const fullMonthName = dayjs().format('MMMM').charAt(0).toUpperCase() + dayjs().format('MMMM').slice(1);

    const filename = `${fullMonthName}-${dayjs().year()}.pdf`;

    const to = 'zoandrianambinina@gmail.com';

    resend.emails.send({
      from: 'zoandrianambinina@gmail.com',
      to: to,
      subject: 'Invoice generated',
      html: '<p>Your invoice is ready!</p>',
      attachments: [
        {
          filename: filename,
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
