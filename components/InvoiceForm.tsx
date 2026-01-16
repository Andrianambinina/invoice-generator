'use client';

import { Button } from './ui/button';

const InvoiceForm = () => {
  const handleSendmail = async () => {
    try {
      const response = await fetch('/api/email', { method: 'POST' });
      await response.json();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Button className="cursor-pointer" onClick={handleSendmail}>
        Send Email
      </Button>
    </>
  );
};

export default InvoiceForm;
