import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  // Add CORS headers just in case
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Use VITE_ prefix as a fallback since Vite uses VITE_ vars
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: "Supabase configuration missing" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { name, email, message, phone, role } = req.body;

  try {
    const { data, error } = await supabase
      .from("feedbacks")
      .insert([{ name, email, message, phone, role }]);

    if (error) throw error;
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Feedback error:", error);
    return res.status(500).json({ error: error.message });
  }
}
