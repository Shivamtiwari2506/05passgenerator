import { useCallback, useState,useEffect,useRef} from 'react'



function App() {
  const [length ,setLength] = useState(8);
  const [numFlag ,setNumFlag] = useState(false);
  const [charFlag ,setCharFlag] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
 
  const passwordGenerator= useCallback(()=>{
     let pass= ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
     if(numFlag)str+="0123456789"
     if(charFlag)str+="!@#$%^&*_-+=~"

     for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1);

      pass+= str.charAt(char);

      
     }
     setPassword(pass);


  },[length,numFlag,charFlag,setPassword]);
     
  const copyPassToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[length,numFlag,charFlag,passwordGenerator])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg mt-20 px-4 py-3 my-8 bg-gray-700 text-orange-500 text-center'>
     <h1 className='text-4xl text-white'>Password generator</h1>

     <div className='flex shadow rounded-lg overflow-hidden m-6'>
      <input 
      type="text"
      value={password}
      className='outline w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref = {passwordRef}
       />

       <button onClick={copyPassToClipBoard} className=' flex justify-center outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>
        copy
       </button>
     </div>

       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          id="lengthRange"
          type="range"
          min={6} 
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label htmlFor="lengthRange">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={numFlag}
          id="numberInput"
          onChange={()=>{setNumFlag((prev)=>!prev)}}
          />

          <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input 
          type="checkbox"
          defaultChecked={charFlag}
          id="charInput"
          onChange={()=>{setCharFlag((prev)=>!prev)}}
          />

          <label htmlFor="charInput">Character</label>
        </div>

       </div>

     </div>
    </>
  )
}

export default App
