import { DefaultUser } from 'next-auth';

export interface UserInfo extends DefaultUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  platform: string;
}
