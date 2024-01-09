/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post(
    '/registration',
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Password must be longer than 8 and shorter than 12 symbols').isLength({ min: 8, max: 12 }),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Uncorrect request' });
            }

            const { email, password, first_name, last_name } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} alredy exists` });
            }
            const hashPassword = await bcrypt.hash(password as string, 2);
            const user = new User({ email, password: hashPassword, first_name, last_name });
            await user.save();

            return res.json({ message: 'User was created' });
        } catch (error) {
            console.log(error);
            res.send({ message: 'server error' });
        }
    }
);

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: `User not found`, status: 404 });
        }
        const isPassValid = bcrypt.compareSync(password as string, user.password);

        if (!isPassValid) {
            return res.status(400).json({ message: `Invalid password`, status: 400 });
        }

        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({ message: 'server error' });
    }
});

router.get('/auth', auth, async (req: Request & { user: { id: string } }, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({ message: 'server error' });
    }
});

export default router;
