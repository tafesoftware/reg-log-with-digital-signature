import { Router } from 'express';
import { body, param, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Signature from '../models/Signature.js';
import auth from '../middleware/auth.js';

const NO_SIGNATURE_MSG = 'No digital signature on file. Registration with a signature is required.';

const router = Router();

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

router.post(
  '/register',
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('studentId').trim().notEmpty().withMessage('Student ID is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('year').isInt({ min: 1, max: 6 }).withMessage('Year must be between 1 and 6'),
    body('signatureData').notEmpty().withMessage('Digital signature is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, email, password, studentId, department, year, profileImage, signatureData } = req.body;

      const existingUser = await User.findOne({
        $or: [{ email }, { studentId }],
      });
      if (existingUser) {
        const field = existingUser.email === email ? 'Email' : 'Student ID';
        return res.status(400).json({ message: `${field} already exists` });
      }

      const user = await User.create({ firstName, lastName, email, password, studentId, department, year, profileImage });
      await Signature.create({
        user: user._id,
        signatureData,
        metadata: req.body.metadata || {},
      });
      const token = signToken(user._id);

      res.status(201).json({ token, user });
    } catch (err) {
      console.error('Register error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const signature = await Signature.findOne({ user: user._id });
      if (!signature) {
        return res.status(403).json({ message: NO_SIGNATURE_MSG });
      }

      const token = signToken(user._id);
      res.json({ token, user });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get me error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put(
  '/me',
  auth,
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('year').isInt({ min: 1, max: 6 }).withMessage('Year must be between 1 and 6'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, lastName, department, year, profileImage } = req.body;
      const update = { firstName, lastName, department, year };
      if (profileImage) update.profileImage = profileImage;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        update,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'Profile updated', user });
    } catch (err) {
      console.error('Update error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.delete('/me', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Signature.findOneAndDelete({ user: req.user.id });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
