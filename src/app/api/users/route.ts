import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

// 用户数据文件路径
const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

// 确保data目录和users.json文件存在
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(USERS_FILE_PATH)) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify([]), 'utf8');
}

// 获取所有用户数据
export async function GET() {
  try {
    // 验证用户是否已登录
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const usersData = JSON.parse(fs.readFileSync(USERS_FILE_PATH, 'utf8'));
    return NextResponse.json(usersData);
  } catch (error) {
    return NextResponse.json({ error: '获取用户数据失败' }, { status: 500 });
  }
}

// 获取当前登录用户数据
export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: '未授权访问' }, { status: 401 });
    }

    const usersData = JSON.parse(fs.readFileSync(USERS_FILE_PATH, 'utf8'));
    const currentUser = usersData.find((user: any) => user.email === session.user.email);

    if (!currentUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json(currentUser);
  } catch (error) {
    return NextResponse.json({ error: '获取用户数据失败' }, { status: 500 });
  }
}