import { UserInfo } from '@/types/user';
import { decryptionAesPsd } from '@/utils/crypto';
// import { encryptionAesPsd } from '@/utils/crypto';
import { NextAuthOptions, User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  },
  providers: [
    CredentialsProvider({
      name: '账号登录',
      credentials: {
        user_name: {
          label: '账号',
          type: 'text',
          placeholder: '请输入账号',
        },
        password: {
          label: '密码',
          type: 'password',
          placeholder: '请输入密码',
        },
      },
      async authorize(credentials) {
        if (typeof credentials !== 'undefined') {
          // 认证邮件和密码是否正确
          if (
            credentials.user_name === 'qk' &&
            decryptionAesPsd(credentials.password) === '111111'
          ) {
            return {
              id: '453421041@qq.com',
              name: credentials.user_name,
              image: 'https://next.131407.vip/images/logo.png',
              email: '453421041@qq.com',
            } as User;
          }
          return null;
          // if (typeof res !== 'undefined') {
          //   // 使用Ts的小伙伴需要自己重新声明一下User接口，要么编辑器会提示没有apiToken等其他多余的属性
          //   return { ...res.user, id: res.token } as User;
          // } else {
          //   return null;
          // }
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 50000,
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user = {
        name: token.name,
        email: token.email,
        picture: token.picture,
      };
      return session;
    },
  },
};

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user as UserInfo;
  } catch (error) {
    console.log('getServerSession error：', error);
    return null;
  }
}
