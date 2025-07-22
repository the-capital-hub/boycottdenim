// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/dbconnect";

const dummyOTP = "123456";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  await connectDB()

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
