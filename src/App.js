import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState(null);

  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files.item(0);
    const text = await file.text();
    setContent(text);
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
    </div>
  );
}

export default App;
