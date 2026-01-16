'use client';

const InvoiceForm = () => {
  const handleSendmail = async () => {
    // download invoice pdf with react-pdf/renderer

    // convert it to base64

    // send it to the backend api to send email with resend
    try {
      const response = await fetch('/api/email', { method: 'POST' });
      const data = await response.json();
      console.log('🎀 response', data.message);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSendmail}>
        Send Test Email
      </button>
    </>
  );
};

export default InvoiceForm;
