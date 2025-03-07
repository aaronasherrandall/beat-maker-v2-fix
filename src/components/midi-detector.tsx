"use client";

import { useState, useEffect, useRef } from "react";
import { PolySynth, Synth, Frequency, start } from "tone";

export default function MidiDetector() {
  const [midiEnabled, setMidiEnabled] = useState(false);
  const [midiDevice, setMidiDevice] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const polySynth = useRef<InstanceType<typeof PolySynth> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    polySynth.current = new PolySynth(Synth).toDestination();
    polySynth.current.set({
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.05,
        release: 0.1
      }
    });

    console.log("✅ PolySynth Initialized:", polySynth.current);
  }, []);

  const playNote = () => {
    if (polySynth.current && midiEnabled) {
      polySynth.current.triggerAttackRelease("C4", "8n");
      console.log("🎵 Playing Note: C4");
    } else {
      console.error("🚨 polySynth is not initialized!");
    }
  };

  const initializeAudioAndMIDI = async () => {
    try {
      const AudioContext = window.AudioContext;
      const audioContext = new AudioContext();
      await audioContext.resume();
      await start();
      setAudioEnabled(true);
      console.log("✅ Audio Context Started");

      if (navigator.requestMIDIAccess) {
        const midiAccess = await navigator.requestMIDIAccess();
        console.log("✅ MIDI Access Granted:", midiAccess);

        const inputs = Array.from(midiAccess.inputs.values());
        console.log("🎹 Available MIDI Inputs:", inputs);

        const midiDevice = inputs[0];

        if (midiDevice) {
          setMidiEnabled(true);
          setMidiDevice(midiDevice.name || "Unknown MIDI Device");
          console.log(`🎹 Found Focusrite MIDI Device: ${midiDevice.name}`);

          inputs.forEach((device) => {
            console.log(`🎹 Assigning MIDI Input: ${device.name} (ID: ${device.id})`);
            device.onmidimessage = handleMIDIMessage;
          });

          midiAccess.onstatechange = (event) => {
            const port = event.port;
            if (port.type === "input") {
              if (port.state === "connected") {
                setMidiEnabled(true);
                setMidiDevice(port.name || "Unknown Port");
              } else if (port.state === "disconnected") {
                const connectedInputs = Array.from(midiAccess.inputs.values()).filter(
                  input => input.state === "connected"
                );

                if (connectedInputs.length === 0) {
                  setMidiEnabled(false);
                  setMidiDevice(null);
                } else {
                  setMidiDevice(connectedInputs[0].name || "Unknown Input");
                }
              }
            }
          };
        } else {
          console.warn("🚨 No Focusrite MIDI device found.");
          setMidiEnabled(false);
          setMidiDevice(null);
        }
      } else {
        throw new Error("Web MIDI API is not supported in this browser.");
      }
    } catch (e) {
      console.error("❌ MIDI Initialization Error:", e);
      setError("Failed to initialize Audio/MIDI");
      setAudioEnabled(false);
    }
  };

  const handleMIDIMessage = (event: WebMidi.MIDIMessageEvent) => {
    const [command, note, velocity] = event.data;
    console.log("🎼 RAW MIDI Message Received:", event.data);

    if (!polySynth.current) return;

    if (command === 144 && velocity > 0) {
      console.log(`🎵 Note ON: ${note}`);
      polySynth.current.triggerAttack(Frequency(note, "midi").toFrequency());
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      console.log(`🎵 Note OFF: ${note}`);
      polySynth.current.triggerRelease(Frequency(note, "midi").toFrequency());
    }
  };

  return (
    <div className="p-6 bg-zinc-800 rounded-lg shadow-lg max-w-md w-full text-center">
      <button
        onClick={initializeAudioAndMIDI}
        className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4"
      >
        Enable Audio & MIDI
      </button>

      {error ? (
        <div className="text-red-400 mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className={`text-xl mb-4 ${audioEnabled ? "text-green-400" : "text-yellow-400"}`}>
            {audioEnabled ? "Audio Enabled!" : "Click the button to enable Audio"}
          </div>

          <div className="mt-6">
            <div className="text-lg font-semibold mb-2">MIDI Status:</div>
            {midiEnabled ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-green-400">Connected</span>
                </div>
                <div className="text-white">{midiDevice}</div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-red-400">No MIDI devices detected</span>
              </div>
            )}
            <div>
              <button onClick={playNote} className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md">
                Test Audio Only
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
