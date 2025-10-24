export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import fs from "fs/promises";
import path from "path";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use /tmp because that's the only writable directory in Vercel
    const tempPath = path.join("/tmp", file.name);
    await fs.writeFile(tempPath, buffer);

    const dgResponse = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      { model: "nova-2", mimetype: "audio/mp3" }
    );

    const response = dgResponse.result || dgResponse;
    const transcriptText =
      response?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    return NextResponse.json({ text: transcriptText });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
