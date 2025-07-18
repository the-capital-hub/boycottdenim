import { NextRequest, NextResponse } from "next/server";

const dummyOTP = "123456"; // Replace later with real OTP logic

export async function POST(req: NextRequest) {
  const {  otp } = await req.json();

  if (otp !== dummyOTP) {
    return NextResponse.json({ message: "Invalid OTP." }, { status: 401 });
  }

  // OTP is valid
  return NextResponse.json({ message: "OTP verified successfully!" });
}
