// src/utils/useSpeechToText.js
import { useRef } from "react";

export const useSpeechToText = (onResult) => {
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Speech Recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        console.log("🎙️ Listening...");
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log("✅ Heard:", text);
        onResult(text);
      };

      recognition.onerror = (event) => {
        console.error("⚠️ Speech Recognition Error:", event.error);
        alert("Microphone error: " + event.error);
      };

      recognition.onend = () => {
        console.log("🛑 Stopped listening.");
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.error("Cannot start speech recognition:", err);
    }
  };

  return { startListening };
};
