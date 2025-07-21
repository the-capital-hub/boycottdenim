// <<<<<<< backend
// app/api/verify-otp/route.ts
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'


const SECRET = process.env.JNW_SECRET || "supersecret123"


// import connectDB from "@/utils/db";

const dummyOtp = "123456"

export async function POST(req: Request) {
//   await connectDB();
  const { otp } = await req.json();

  if (!otp) {
    return NextResponse.json({ message: "Phone and OTP are required." }, { status: 400 });
  }

  if (dummyOtp !== otp)
    return NextResponse.json({ error: "Incorrect OTP" }, { status: 400 });


//   const token = jwt.sign(
//     { userId: user._id, 
//       phone: user.phone 
//     }, 
//     SECRET, 
//     { expiresIn: "7d" });

  return NextResponse.json({ message: "OTP verified successfully" });//token
// =======
// import { NextRequest, NextResponse } from "next/server";

// const dummyOTP = "123456"; // Replace later with real OTP logic

// export async function POST(req: NextRequest) {
//   const {  otp } = await req.json();

//   if (otp !== dummyOTP) {
//     return NextResponse.json({ message: "Invalid OTP." }, { status: 401 });
//   }

//   // OTP is valid
//   return NextResponse.json({ message: "OTP verified successfully!" });
// >>>>>>> main
}
