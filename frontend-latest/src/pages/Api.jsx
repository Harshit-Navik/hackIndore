import { useState } from 'react'
import Answer from '../components/answer'

function Api() {

const [question , setQuestion] = useState("")
const [result , setResult] = useState("")


const payload ={
       "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
}    

const askQuestion = async() => {
       const apiKey = import.meta.env.VITE_API_KEY;
      let response = await fetch(apiKey,{ 
        method: 'POST',
        headers: {
      "Content-Type": "application/json",
    },
        body: JSON.stringify(payload),
      })

response = await response.json();  
//  console.log(response.candidates[0].content.parts[0].text);    

let dataString = response.candidates[0].content.parts[0].text

dataString = dataString.split("* ")

dataString = dataString.map((item)=>item.trim())
setResult(dataString);

      
  
     
}
  return (
    <> 
    <div className='header  grid grid-cols-5'>  

      <div className=' col-span-1  bg-zinc-800  h-screen '>
         <h1 className=' font-sharif my-3.5 text-2xl flex justify-center item-center fixed' >Recent Searches</h1>
      </div>

      <div className='col-span-4'>
          <h1 className =" flex font-bold text-5xl my-8   justify-center" >AI-Here To Help You</h1>
          <div className='result flex  justify-center p-4  '>
            <ul>
              {result && result.map((item , index) => (
               <li key={index} className = " p-1" > <Answer ans = {item} index={index}  /></li>
              )
              
              )} 
            </ul>    
          </div>
          <div className='Chatbot   p-1 w-1/2 pr-5 text-white m-auto rounded-4xl  bg-zinc-800 flex h-16 bottom-5 fixed right-0 left-75 '>
            <input  onChange={(e)=>setQuestion(e.target.value)} className='p-3 w-full h-full outline-none ' type="text" placeholder='Ask me anything' />
            <button  onClick={askQuestion}>Ask</button>
          </div>
      </div>

    </div>   
       
       
       
    </>
  )
}

export default Api
