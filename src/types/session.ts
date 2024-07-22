import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      picture?: string | null;
      // platform: 'github';
    } & DefaultSession['user'];
  }
}
