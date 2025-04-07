'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage = '登录过程中发生错误';
  if (error === 'AccessDenied') {
    errorMessage = '访问被拒绝。请确保您已授权应用程序访问所需权限。';
  } else if (error === 'Configuration') {
    errorMessage = '服务器配置错误。请联系管理员。';
  } else if (error === 'Verification') {
    errorMessage = '验证失败。请重试。';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">登录错误</h2>
          <p className="text-gray-600">{errorMessage}</p>
          <button
            onClick={() => window.location.href = '/auth/signin'}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回登录
          </button>
        </div>
      </div>
    </div>
  );
}