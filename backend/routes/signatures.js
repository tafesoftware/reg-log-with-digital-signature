import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Signature from '../models/Signature.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post(
  '/',
  auth,
  [body('signatureData').notEmpty().withMessage('Signature data is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { signatureData, metadata } = req.body;

      const existing = await Signature.findOne({ user: req.user.id });
      if (existing) {
        existing.signatureData = signatureData;
        if (metadata) existing.metadata = metadata;
        await existing.save();
        return res.json({ message: 'Signature updated', signature: existing });
      }

      const signature = await Signature.create({
        user: req.user.id,
        signatureData,
        metadata,
      });

      res.status(201).json({ message: 'Signature saved', signature });
    } catch (err) {
      console.error('Save signature error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const signature = await Signature.findOne({ user: req.user.id });
    if (!signature) {
      return res.status(404).json({ message: 'No signature found' });
    }
    res.json(signature);
  } catch (err) {
    console.error('Get signature error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/', auth, async (req, res) => {
  try {
    const signature = await Signature.findOneAndDelete({ user: req.user.id });
    if (!signature) {
      return res.status(404).json({ message: 'No signature found' });
    }
    res.json({ message: 'Signature deleted' });
  } catch (err) {
    console.error('Delete signature error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
