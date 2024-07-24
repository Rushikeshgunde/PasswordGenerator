import { useCallback, useState,useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, Setlength] = useState(8);
  const [numberallow, setnumberallow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [Password, setpassword] = useState();

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberallow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setpassword(pass)

   

  }, [length, numberallow, charAllow, setpassword])
    
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();  
    window.navigator.clipboard.writeText(Password)
  }, [Password])
  
  useEffect(() => {
    passwordGenerator()
  }, [length, numberallow, charAllow, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly    
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {Setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberallow}
          id="numberInput"
          onChange={() => {
              setnumberallow((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={setcharAllow}
              id="characterInput"
              onChange={() => {
                setcharAllow((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
     </div>
      </div>
    </> 
  )
}

export default App
