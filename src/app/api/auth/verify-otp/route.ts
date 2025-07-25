// app/api/verify-otp/route.ts

import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { connectDB } from "@/lib/dbconnect";
import { User } from "@/models/User";

const SECRET = process.env.JNW_SECRET || "supersecret123";
const dummyOtp = "123456";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { phone, otp } = await req.json();

    if (!otp || !phone) {
      return NextResponse.json({ message: "Phone and OTP are required." }, { status: 400 });
    }

    if (dummyOtp !== otp) {
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 400 });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.userType,
      },
      SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ message: "OTP verified successfully",token });

    const cookieName = user.userType === "admin" ? "adminToken" : "token";

    response.cookies.set(cookieName, token, {
      httpOnly: false,
      secure: false,//process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
    });

    return response;

  } catch (err) {
    console.error("OTP verification failed:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

