import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    // validate email and password
    console.log(email, password);
    const hashPassword = await hash(password, 10);

    const response = await sql`
        INSERT INTO users (
            email, password
        ) VALUES (${email}, ${hashPassword})
    `;
    console.log({ response });
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "successfully" });
}
