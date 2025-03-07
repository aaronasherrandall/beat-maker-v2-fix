import React from 'react';
import MidiDetector from "@/components/midi-detector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-8">MIDI Input Detector</h1>
      <MidiDetector />
    </main>
  )
}
