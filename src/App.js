import OpenAI from "openai";
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files.item(0);
    const text = await file.text();
    setContent(text);
  };

  const chatCompletion = async () => {
    console.log("chat completion");
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
    setResponse(completion.choices[0]?.message?.content);

    console.log(completion.choices[0]?.message?.content);
  };

  return (
    <div className="App">
      <h1>XML To Rest Assured</h1>
      <div>
        <input type="file" onChange={(e) => handleFileChange(e)} />
      </div>
      {file && (
        <div>
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>File Size: {file.size}</p>
          <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
          {content && <p>{content}</p>}
        </div>
      )}
      <button onClick={chatCompletion}>Chat Completion</button>
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
