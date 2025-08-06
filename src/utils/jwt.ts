import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from "ms";


const SECRET = process.env.JWT_SECRET || 'chave_fallback_insegura';

export type JWTPayload = {
  id: number;
  email: string;
  name: string;
  role?: string;
};

// ✅ função corrigida com tipagem correta:
export function signJWT(payload: JWTPayload, expiresIn: StringValue = '1h'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload;
  } catch (error) {
    console.error("Erro ao verificar JWT:", error);
    return null;
  }
}
