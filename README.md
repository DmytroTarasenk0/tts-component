# Text To Speech Component

A simple, lightweight React component that provides a "Text to Speech" interface. It includes a text area for input, voice selection (auto-detecting English voices), and playback controls.

![License](https://img.shields.io/npm/l/text-to-speech-component)
![Version](https://img.shields.io/npm/v/text-to-speech-component)

## Features

- **Plug & Play:** Drop it into any React app.
- **Auto-Detection:** Automatically selects "English (UK) Female" or the best available English voice.
- **Smart Chunking:** Splits long text into natural chunks for smoother speech.
- **Self-Contained:** Manages its own state (input text, selected voice, playback).
- **Zero Dependencies:** Only requires React.

## Installation

```bash
npm install text-to-speech-component
```

## Usage

1. Import the component.
2. **Import the CSS styles** (Required for the layout to look right).
3. Render it.

```jsx
import React from "react";
import { TextToSpeech } from "text-to-speech-component";

// Essential: Import the styles.
import "text-to-speech-component/dist/text-to-speech-component.css";

function App() {
  return (
    <div className="App">
      <TextToSpeech />
    </div>
  );
}

export default App;
```
