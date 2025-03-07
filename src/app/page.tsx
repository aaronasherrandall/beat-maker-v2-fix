import React from 'react';
import MidiDetector from "@/components/midi-detector"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900 text-white">
      <h1 className="text-3xl font-bold mb-8">MIDI Input Detector</h1>
      <MidiDetector />

      {/* <div className='flex flex-row'>
      {[...Array(4)].map((_, index) => (
        <Button key={index}
        label={`Button ${index + 1}`}
        number={`${index + 1}`}
        color={`${(index - 1) + 1}`}
        disabled/>
      ))}
      </div>
      <div className='flex flex-row'>
      {[...Array(4)].map((_, index) => (
        <Button key={index} label={`Button ${index + 1}`} number={`${index + 1}`} disabled/>
      ))}
      </div>
      <div className='flex flex-row'>
      {[...Array(4)].map((_, index) => (
        <Button key={index} label={`Button ${index + 1}`} number={`${index + 1}`} disabled/>
      ))}
      </div>
      <div className='flex flex-row'>
      {[...Array(4)].map((_, index) => (
        <Button key={index} label={`Button ${index + 1}`} number={`${index + 1}`} disabled/>
      ))}
      </div> */}
    </main>
  )
}
