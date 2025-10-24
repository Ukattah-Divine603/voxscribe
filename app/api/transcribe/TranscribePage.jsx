"use client";
import React, { useState } from "react";

export default function TranscribePage() {
  const [audioFile, setAudioFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!audioFile) return alert("Please select an audio file first!");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to transcribe");

      const data = await res.json();
      setTranscription(data.text);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="transcribe-box"
      style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}
    >
      <h1>Voxcribe AI Transcriber</h1>
      <p>Upload an MP3 file and get instant transcription.</p>

      <input
        type="file"
        accept="audio/mp3,audio/mpeg"
        onChange={handleFileChange}
        style={{ display: "block", margin: "1rem 0" }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: "#111",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {loading ? "Transcribing..." : "Transcribe"}
      </button>

      {transcription && (
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "#f3f3f3",
            borderRadius: 6,
          }}
        >
          <h3>Transcription:</h3>
          <p className="sent">{transcription}</p>
        </div>
      )}
    </div>
  );
}
