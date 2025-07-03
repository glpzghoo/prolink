import { authOptions } from '@/app/providers/google/authOption';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
