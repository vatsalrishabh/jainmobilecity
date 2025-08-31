// app/api/route.js
import { connectToMongoDB } from "@/app/(client)/api/config/db"; // adjust path as needed

export async function GET() {
  try {
    await connectToMongoDB();
    return Response.json({ message: "Connected to MongoDB successfully" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return Response.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}
