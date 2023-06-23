import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };
  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);
  return (
    <div className="h-screen bg-zinc-800 text-white flez items-center justify-center">
      <header className="App-header">
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="border-2 border-zinc-500 p-2 text-black w-full"
          />

          
          <ul className='h-80 overflow-y-auto'>
          {messages.map((message, index) => (
            <li key={index} className='my-2 p-2 text-sm rounded-md bg-sky-700 ml-auto'>
              <p>
                {message.from}: {message.body}
              </p>
            </li>
          ))}
          </ul>
        </form>
      </header>
    </div>
  );
}

export default App;
