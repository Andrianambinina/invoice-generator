import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    secureUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    monthName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', schema);

export default Invoice;
