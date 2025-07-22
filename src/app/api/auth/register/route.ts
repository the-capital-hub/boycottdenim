// <<<<<<< backend
//  app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/dbconnect";

export async function POST(req: NextRequest) {
  await connectDB();

  const { name, email, phone, userType } = await req.json();

  if (!name || !email || !phone) {
    return NextResponse.json({ message: "All fields are required." }, { status: 400 });
  }


  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists." }, { status: 409 });
  }

  const newUser = new User({ name, email, phone, userType });
  await newUser.save();

  return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
}
