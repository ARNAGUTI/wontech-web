import { isDevelopmentEnvironment } from '@/lib/constants';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; 


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

    // ✅ Redirección manual al endpoint de NextAuth
    return NextResponse.redirect(
      new URL(`/api/auth/signin/guest?callbackUrl=${encodeURIComponent(redirectUrl)}`, request.url)
    );
  } catch (error) {
    console.error('❌ ERROR en /api/auth/guest:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
