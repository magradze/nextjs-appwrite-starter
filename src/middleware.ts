import { NextRequest, NextResponse } from 'next/server'
import { getLoggedInUser } from '@/lib/server/appwrite'

// 1. Specify protected and public routes
const protectedRoutes = ['/account']
const publicRoutes = ['/signin', '/signup', '/']

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // 3. Decrypt the session from the cookie
  const session = await getLoggedInUser()

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.$id) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.$id &&
    !req.nextUrl.pathname.startsWith('/account')
  ) {
    return NextResponse.redirect(new URL('/account', req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}