import { useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState();
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const passwordRef = useRef();

  const copyToClipboard = (e) => {
    e.target.innerText = "Copied";
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    let pass = "";
    let str = "";

    document.querySelector("#copy").innerText = "Copy";

    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "{}!@#$%^&*+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number, character]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 text-xl">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            id="password"
            value={password}
            ref={passwordRef}
            readOnly
            className="outline-none w-full py-1 px-3"
          />
          <button
            onClick={copyToClipboard}
            id="copy"
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="length"
              name="length"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer"
            />
            <label>Range: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="number"
              name="number"
              checked={number}
              onChange={(e) => {
                setNumber(e.target.checked);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="character"
              name="character"
              checked={character}
              onChange={(e) => {
                setCharacter(e.target.checked);
              }}
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
