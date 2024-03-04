import OpenAI from "openai";
import React, { useState } from "react";
import DotPlus from "./DotPlus";
import { Markup } from "interweave";

function App() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);
  const [response, setResponse] = useState(null);
  const [clicked, setClicked] = useState(false);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files.item(0);
    const text = await file.text();
    setContent(text);
  };

  const chatCompletion = async () => {
    if (file === null) {
      alert("Please select an XML file");
      return;
    }
    if (file.type !== "text/xml") {
      alert("Please select an XML file");
      return;
    }
    if (!content) {
      alert("Please select an XML file which contains the valid xml content");
      return;
    }
    let additionalContent = content.concat(
      "\n Give me Only Code of Rest Assured JAVA using the xml content"
    );
    setClicked(true);
    setContent(additionalContent);
    console.log("chat completion");

    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_API_KEY,
      dangerouslyAllowBrowser: true,
    });
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant designed to Output Rest Assured Code in JAVA only",
        },
        { role: "user", content: content },
      ],
      model: "gpt-3.5-turbo",
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const responseData = completion.choices[0]?.message?.content;
    setResponse(responseData);
  };

  return (
    <div className="App">
      <h1>XML TO REST ASSURED CONVERTER</h1>
      <label>
        <span>Click To Upload any XML File</span>
        <input type="file" onChange={(e) => handleFileChange(e)} />
      </label>
      {file && (
        <div className="file-details">
          <p>File Name: {file.name}</p>
          <p>File Type: {file.type}</p>
          <p>File Size: {file.size}</p>
          <p>Last Modified: {file.lastModifiedDate.toDateString()}</p>
        </div>
      )}
      <button className="submit-btn" onClick={chatCompletion}>
        Submit File to Generate Rest Assured code
      </button>
      {!response && clicked && (
        <h2 className="loader">
          Generating Code <DotPlus />
        </h2>
      )}
      {response && (
        <div className="output-plate">
          <Markup content={response} />
        </div>
      )}
    </div>
  );
}

export default App;
