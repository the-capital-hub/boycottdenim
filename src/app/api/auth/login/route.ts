// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";

const dummyOTP = "123456"; // Replace with real OTP logic later

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ message: "Phone number is required." }, { status: 400 });
  }

  const existingUser = await User.findOne({ phone });

  if (!existingUser) {
    return NextResponse.json({ message: "User not found. Please register." }, { status: 404 });
  }

  // Here you would integrate with Twilio or other service to send OTP
  // For now, simulate sending dummy OTP
  console.log(`Sending OTP ${dummyOTP} to ${phone}`);

  return NextResponse.json({ message: "OTP sent successfully." }, { status: 200 });
}
