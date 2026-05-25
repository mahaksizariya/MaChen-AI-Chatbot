import { useState, useRef, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import Message from "./Message";

function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 How can I help you today?",
    },
  ]);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // 1. user message add
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
    ]);

    setInput("");
    setLoading(true);

    // 2. empty AI message placeholder (for streaming)
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: "" },
    ]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        result += chunk;

        // update last AI message live
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "ai",
            text: result,
          };
          return updated;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Error generating response",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-slate-100">

      {/* messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6">
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}

        {loading && (
          <div className="bg-slate-300 w-fit px-5 py-2 rounded-2xl animate-pulse">
            AI is thinking...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* input box */}
      <div className="border-t border-slate-300 bg-slate-100 p-3">
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-md">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 outline-none text-slate-800"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-slate-800 hover:bg-slate-600 transition p-3 rounded-xl"
          >
            <IoSend size={18} color="white" />
          </button>

        </div>
      </div>

    </div>
  );
}

export default ChatBox;