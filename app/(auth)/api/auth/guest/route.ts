import { signIn } from 'next-auth/react';
import { isDevelopmentEnvironment } from '@/lib/constants';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie: !isDevelopmentEnvironment,
    });

    if (token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return signIn('guest', { redirect: true, callbackUrl: redirectUrl });
  } catch (error) {
    console.error('❌ ERROR en /api/auth/guest:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
