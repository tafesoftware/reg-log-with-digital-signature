import mongoose from 'mongoose';

const signatureSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  signatureData: {
    type: String,
    required: true,
  },
  metadata: {
    device: String,
    browser: String,
  },
}, { timestamps: true });

export default mongoose.model('Signature', signatureSchema);
