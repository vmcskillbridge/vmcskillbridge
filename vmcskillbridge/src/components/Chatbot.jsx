import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m VMC Assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("service")) {
      return "We provide frontend development, backend development, full-stack apps, eCommerce websites, UI/UX design, and more.";
    }

    if (msg.includes("price") || msg.includes("cost")) {
      return "Pricing depends on your project. You can start from ₹5,000 and request a quote from the Contact page.";
    }

    if (msg.includes("contact")) {
      return "You can contact us at vmcskillbridge@gmail.com or use the Contact page.";
    }

    if (msg.includes("career") || msg.includes("job")) {
      return "You can apply from the Careers page. Our team will review your application.";
    }

    if (msg.includes("project")) {
      return "To start a project, go to the Contact page and submit your project details.";
    }

    return "Thanks for your message. Please visit the Contact page for detailed support.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
    };

    const botMsg = {
      sender: "bot",
      text: getBotReply(input),
    };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h3>VMC AI Assistant</h3>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;