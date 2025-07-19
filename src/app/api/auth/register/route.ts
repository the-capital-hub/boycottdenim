// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  // await connectDB();

  const { name, email, phone } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists." }, { status: 409 });
  }

  const newUser = new User({ name, email, phone });
  await newUser.save();

  return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
}
