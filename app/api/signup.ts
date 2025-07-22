// File: pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { referralNode, fullName, email, phone, password } = req.body;

  if (!referralNode || !fullName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { error } = await supabase.from("users").insert([
    {
      referral_node: referralNode,
      full_name: fullName,
      email,
      phone,
      password, // plain text password (as requested)
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ message: "User created successfully" });
}
