import { z } from 'zod';

import { loginSchema } from '@/schemas/auth.schema';

export type LoginPayload = z.infer<typeof loginSchema>;
