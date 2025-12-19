import React, { useState, useEffect } from "react";
import "./TextToSpeech.css";

// Helper function
function splitTextIntoChunks(text) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + 300;
    if (end < text.length) {
      const dotIndex = text.lastIndexOf(".", end);
      if (dotIndex > start + 50) end = dotIndex + 1;
    }
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks;
}

export const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      let ukFemaleIndex = availableVoices.findIndex(
        (v) =>
          v.lang.toLowerCase() === "en-gb" &&
          v.name.toLowerCase().includes("female")
      );
      if (ukFemaleIndex === -1) {
        ukFemaleIndex = availableVoices.findIndex(
          (v) => v.lang.toLowerCase() === "en-gb"
        );
      }
      if (ukFemaleIndex !== -1) {
        setSelectedVoiceIndex(ukFemaleIndex);
      } else {
        const anyEnglish = availableVoices.findIndex((v) =>
          v.lang.toLowerCase().startsWith("en")
        );
        if (anyEnglish !== -1) setSelectedVoiceIndex(anyEnglish);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    const selectedVoice = voices[selectedVoiceIndex];
    const chunks = splitTextIntoChunks(text);

    chunks.forEach((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    });
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="tts-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="tts-textarea"
      />

      <div className="tts-controls">
        <select
          value={selectedVoiceIndex}
          onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
          className="tts-select"
        >
          {voices.map((v, i) => (
            <option key={v.name} value={i}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
        <button onClick={handleSpeak}>Speak</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};
