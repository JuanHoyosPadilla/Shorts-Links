import { useState } from "react";

import "./App.css";

function App() {
  const [link, setLink] = useState("");
  const [data, setData] = useState({});
  const [islink,setIsLink] = useState(false);

  const enviarUrl = (e) => {
    e.preventDefault()
    const url = 'http://localhost:3000/acortar';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link })
    }).then(response => response.json()).then(data => {
      console.log('Respuesta del servidor', data)
      setData(data)
      setIsLink(true);
    })
    .catch(error => {
      console.error('Error',error)
    })
  }
console.log(data)
  return (
    <>
      <form onSubmit={enviarUrl}>
        <div>
          <h1>URL Shortener</h1>
          <label htmlFor="url">Enter a URL: </label>
          <input
            type="text"
            id="url"
            value={link}
            placeholder="Short Links"
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </div>
        <div>
          <button type="submit">Shorts Link</button>
        </div>
      </form>
      {
        !islink ? '' : <div>
          <span>{data.urlexample}</span>
          <a href={data.urlexample} > ir a la pagina</a>
        </div>
      }
    </>
  );
}

export default App;
