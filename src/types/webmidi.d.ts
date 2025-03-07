interface Navigator {
  requestMIDIAccess(): Promise<WebMidi.MIDIAccess>
}

declare namespace WebMidi {
  interface MIDIAccess extends EventTarget {
    inputs: MIDIInputMap
    outputs: MIDIOutputMap
    onstatechange: ((event: MIDIConnectionEvent) => void) | null
  }

  interface MIDIConnectionEvent {
    port: MIDIPort
  }

  interface MIDIInputMap {
    entries(): IterableIterator<[string, MIDIInput]>
    keys(): IterableIterator<string>
    values(): IterableIterator<MIDIInput>
    forEach(callback: (input: MIDIInput, key: string) => void): void
    size: number
    get(id: string): MIDIInput | undefined
    has(id: string): boolean
  }

  interface MIDIOutputMap {
    entries(): IterableIterator<[string, MIDIOutput]>
    keys(): IterableIterator<string>
    values(): IterableIterator<MIDIOutput>
    forEach(callback: (output: MIDIOutput, key: string) => void): void
    size: number
    get(id: string): MIDIOutput | undefined
    has(id: string): boolean
  }

  interface MIDIInput extends MIDIPort {
    onmidimessage: ((event: MIDIMessageEvent) => void) | null
  }

  interface MIDIOutput extends MIDIPort {
    send(data: Uint8Array | number[], timestamp?: number): void
    clear(): void
  }

  interface MIDIMessageEvent {
    data: Uint8Array
  }

  interface MIDIPort extends EventTarget {
    id: string
    manufacturer?: string
    name?: string
    type: "input" | "output"
    version?: string
    state: "connected" | "disconnected"
    connection: "open" | "closed" | "pending"
    onstatechange: ((event: MIDIConnectionEvent) => void) | null
    open(): Promise<MIDIPort>
    close(): Promise<MIDIPort>
  }
}
