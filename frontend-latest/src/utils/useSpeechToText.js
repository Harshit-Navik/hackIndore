// src/utils/useSpeechToText.js
import { useRef } from "react";

export const useSpeechToText = (onResult) => {
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-IN";
      recognitionRef.current.onresult = (event) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };
      recognitionRef.current.onerror = (err) => console.error(err);
    }

    recognitionRef.current.start();
  };

  return { startListening };
};
