import { User } from "@/models/User";
import { connectDB } from "@/lib/dbconnect";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
  
    try {
     
      const users = await User.find().select("name email phone");
      return NextResponse.json({ success: true, users });
    } catch (err) {
        console.error("Can't find Users", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
  }