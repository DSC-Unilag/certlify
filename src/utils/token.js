import { sign } from 'jsonwebtoken'
import { Token } from '../models/Token'
const secret = process.env.SECRET || config.secret;

export const maxAge = 3 * 24 * 60 * 60;

/**
 * Creates JWT Token
 * @param id user._id
 * @returns 
 */
export async function createToken (id) {
    const token = sign({ id }, secret, {
        expiresIn: maxAge
    });

    const storedToken = await Token.create({ value: token });

    return storedToken;
}