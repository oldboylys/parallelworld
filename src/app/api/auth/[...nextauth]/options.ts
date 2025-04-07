import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

// 用户数据文件路径
const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

// 确保data目录和users.json文件存在
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(USERS_FILE_PATH)) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify([]), 'utf8');
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Wallet',
      credentials: {
        address: { label: 'Wallet Address', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.address) return null;

        // 读取现有用户数据
        const usersData = JSON.parse(fs.readFileSync(USERS_FILE_PATH, 'utf8'));
        
        // 检查用户是否已存在
        let user = usersData.find((u: any) => u.address === credentials.address);
        
        if (!user) {
          // 添加新用户
          user = {
            id: credentials.address,
            address: credentials.address,
            name: `${credentials.address.slice(0, 6)}...${credentials.address.slice(-4)}`,
            provider: 'wallet',
            createdAt: new Date().toISOString(),
          };
          usersData.push(user);
          fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersData, null, 2));
        }
        
        return user;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      // 读取现有用户数据
      const usersData = JSON.parse(fs.readFileSync(USERS_FILE_PATH, 'utf8'));
      
      // 检查用户是否已存在
      const existingUser = usersData.find((u: any) => u.email === user.email);
      
      if (!existingUser) {
        // 添加新用户
        const newUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: account?.provider,
          createdAt: new Date().toISOString(),
        };
        usersData.push(newUser);
        fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(usersData, null, 2));
      }
      
      return true;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};