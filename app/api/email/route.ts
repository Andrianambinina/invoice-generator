import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST() {
  try {
    const resend = new Resend('re_S9wRwAD8_CnFeZvjU6jr8TrhDJVFivWLT');

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zoandrianambinina@gmail.com',
      subject: 'Invoice generated',
      html: '<p>Your invoice is ready!</p>',
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
