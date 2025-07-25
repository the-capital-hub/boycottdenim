import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || "fallback_secret";

export function authMiddleware(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ message: 'Unauthorized. Please log in.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const decoded: any = jwt.verify(token, SECRET);

      // Pass decoded info to handler
      return handler(req, { userId: decoded.userId, phone: decoded.phone }, ...args);

    } catch (err) {
      return new Response(JSON.stringify({ message: 'Invalid or expired token.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}

export function adminMiddleware(handler: Function) {
  return async (req: Request, ...args: any[]) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log(token);
    

    if (!token) {
      return new Response(JSON.stringify({ message: 'Unauthorized. Please log in.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const decoded: any = jwt.verify(token, SECRET);
      console.log(decoded);
      

      if (decoded.role !== 'Admin') {
        return new Response(JSON.stringify({ message: 'Forbidden: Admins only.' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return handler(req, { userId: decoded.userId, role: decoded.role }, ...args);

    } catch (err) {
      return new Response(JSON.stringify({ message: 'Invalid or expired token.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}




// app/api/logout/route.ts
// import { NextResponse } from 'next/server';

// export async function POST() {
//   const response = NextResponse.json({ message: 'Logged out' });

//   response.cookies.set('token', '', {
//     httpOnly: true,
//     path: '/',
//     expires: new Date(0),
//   });

//   response.cookies.set('adminToken', '', {
//     httpOnly: true,
//     path: '/',
//     expires: new Date(0),
//   });

//   return response;
// }
