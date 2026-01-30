import { dbConnect } from '@/lib/config/mongoose';
import Invoice from '@/lib/models/invoice.model';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadInvoice(pdfBuffer: Buffer, fileName: string) {
  const base64Pdf = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

  const result = await cloudinary.uploader.upload(base64Pdf, {
    resource_type: 'image',
    public_id: `factures/${fileName}`,
    format: 'pdf',
  });

  return result.secure_url;
}

export async function createInvoice(secureUrl: string, monthName: string) {
  await dbConnect();
  return await Invoice.create({ secureUrl, monthName });
}
