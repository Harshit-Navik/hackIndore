// import { useState } from 'react'
// import Answer from '../components/Answer'

// function Api() {

// const [question , setQuestion] = useState("")
// const [result , setResult] = useState("")


// const payload ={
//        "contents": [
//       {
//         "parts": [
//           {
//             "text": question
//           }
//         ]
//       }
//     ]
// }    

// const askQuestion = async() => {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       let response = await fetch(apiKey,{ 
//         method: 'POST',
//         headers: {
//       "Content-Type": "application/json",
//     },
//         body: JSON.stringify(payload),
//       })

// response = await response.json();  
// //  console.log(response.candidates[0].content.parts[0].text);    

// let dataString = response.candidates[0].content.parts[0].text

// dataString = dataString.split("* ")

// dataString = dataString.map((item)=>item.trim())
// setResult(dataString);

      
  
     
// }
//   return (
//     <> 
//     <div className='header  grid grid-cols-5'>  

//       <div className=' col-span-1  bg-zinc-800  h-screen '>
//          <h1 className=' font-sharif my-3.5 text-2xl flex justify-center item-center fixed' >Recent Searches</h1>
//       </div>

//       <div className='col-span-4'>
//           <h1 className =" flex font-bold text-5xl my-8   justify-center" >AI-Here To Help You</h1>
//           <div className='result flex  justify-center p-4  '>
//             <ul>
//               {result && result.map((item , index) => (
//                <li key={index} className = " p-1" > <Answer ans = {item} index={index}  /></li>
//               )
              
//               )} 
//             </ul>    
//           </div>
//           <div className='Chatbot   p-1 w-1/2 pr-5 text-white m-auto rounded-4xl  bg-zinc-800 flex h-16 bottom-5 fixed right-0 left-75 '>
//             <input  onChange={(e)=>setQuestion(e.target.value)} className='p-3 w-full h-full outline-none ' type="text" placeholder='Ask me anything' />
//             <button  onClick={askQuestion}>Ask</button>
//           </div>
//       </div>

//     </div>   
       
       
       
//     </>
//   )
// }

// export default Api


// src/pages/Api.jsx
import { useState, useRef } from "react";
import Answer from "../components/Answer";
import { FaMicrophone, FaPaperPlane, FaHeartbeat } from "react-icons/fa";
import { useSpeechToText } from "../utils/useSpeechToText";

function Api() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const inputRef = useRef(null);

  const { startListening } = useSpeechToText((text) => {
    setListening(false);
    setQuestion(text);
    setTimeout(() => askQuestion(text), 600);
  });

  const handleVoiceInput = () => {
    setListening(true);
    startListening();
  };

  const askQuestion = async (customQuestion) => {
  const finalQuestion = customQuestion || question;
  if (!finalQuestion.trim()) return;
  setLoading(true);

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `You are a professional AI healthcare assistant. 
                   Give helpful, medically accurate answers and remind users to consult a doctor.
                   Question: ${finalQuestion}`,
          },
        ],
      },
    ],
  };

  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    console.log("🧠 Gemini Response:", data);

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid or empty Gemini API response");
    }

    const answer = data.candidates[0].content.parts[0].text;
    setResult((prev) => [
      ...prev,
      { type: "user", text: finalQuestion },
      { type: "bot", text: answer },
    ]);
    setQuestion("");
    inputRef.current.value = "";
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    alert("⚠️ Something went wrong while fetching from Gemini API.");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-teal-100 to-green-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-6 shadow-lg flex items-center justify-center gap-3">
        <FaHeartbeat className="text-3xl animate-pulse" />
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">WeCare Health Assistant</h1>
          <p className="text-sm md:text-base opacity-90">Your AI-powered personal health companion 🩺</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-20 lg:px-40 space-y-6">
        {result.length === 0 && !loading ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">👋 Hello! How can I help with your health today?</p>
            <p className="text-sm text-gray-400 mt-1">
              Try asking things like “What are the symptoms of dehydration?” or “Suggest a balanced diet for diabetes.”
            </p>
          </div>
        ) : (
          result.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-sm md:text-base shadow-md ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-br-none"
                    : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <Answer ans={msg.text} index={index} />
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-center mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8 animate-spin"></div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-white p-4 shadow-lg border-t flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          placeholder="Ask a health-related question..."
          className="flex-1 p-3 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none text-gray-700"
        />

        {/* Mic Button */}
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-full transition-all ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-200 hover:bg-gray-300 text-blue-600"
          }`}
          title="Voice Input"
        >
          <FaMicrophone className="text-xl" />
        </button>

        {/* Send Button */}
        <button
          onClick={() => askQuestion()}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:opacity-90 transition"
          title="Send Message"
        >
          <FaPaperPlane />
        </button>
      </footer>
    </div>
  );
}

export default Api;
