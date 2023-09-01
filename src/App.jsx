import React, { useState } from 'react';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);

  const generatePassword = () => {
    const numbers = '1234567890';
    const characters = '!@#$%^&*()_-+=<>?/[]{}';
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    if (includeNumbers) charset += numbers;
    if (includeCharacters) charset += characters;

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    const inputElement = document.getElementById('passwordInput');
    inputElement.select();
    document.execCommand('copy');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-96 border-gradient-animation">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gradient">Password Generator</h1>
        <div className="mb-4">
          <label htmlFor="passwordLength">Password Length:</label>
          <input
            type="range"
            id="passwordLength"
            min="8"
            max="20"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="w-full"
          />
          <span className="text-gray-600">{passwordLength} characters</span>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2"
          />
          <label htmlFor="includeNumbers">Include Numbers</label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={includeCharacters}
            onChange={() => setIncludeCharacters(!includeCharacters)}
            className="mr-2"
          />
          <label htmlFor="includeCharacters">Include Special Characters</label>
        </div>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded-md mb-4 hover:bg-blue-600 transition duration-300"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        {password && (
          <div className="mb-4">
            <input
              type="text"
              id="passwordInput"
              value={password}
              readOnly
              className="w-full border p-2 rounded-md bg-gray-100 focus:ring focus:ring-blue-400"
            />
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              onClick={copyToClipboard}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
