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

    // Convert uploaded file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file temporarily
    const tempPath = path.join("/tmp", file.name);
    await fs.writeFile(tempPath, buffer);

    // Send to Deepgram for transcription using the new client API
    // The SDK exposes `listen.prerecorded.transcribeFile` for file buffers.
    const dgResponse = await deepgram.listen.prerecorded.transcribeFile(
      buffer,
      { model: "nova-2", mimetype: "audio/mp3" }
    );

    // SDK responses are returned as { result, error } for rest clients
    const response = dgResponse.result || dgResponse;
    const transcriptText =
      response?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

    return NextResponse.json({ text: transcriptText });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
