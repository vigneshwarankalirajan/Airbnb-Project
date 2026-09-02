import React, { useState } from "react";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function Message() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [messages, setMessages] = useState([]);

  const conversationId = localStorage.getItem("conversation_id");
  const userId = localStorage.getItem("user_id");

  const handleSendMessage = async () => {
    if (!message.trim()) {
      return;
    }

    if (!conversationId || !userId) {
      alert("Please login first.");
      return;
    }

    try {
      setSending(true);

      const payload = {
        conversation_id: Number(conversationId),
        sender_id: Number(userId),
        message_type: "text",
        message_text: message.trim(),
        attachment_url: "",
      };

      const response = await axios.post(
        `${API_URL}/messages/`,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Message created:", response.data);

      setMessages((prev) => [
        ...prev,
        response.data,
      ]);

      setMessage("");
    } catch (error) {
      console.error("Message API Error:", error);

      alert(
        error?.response?.data?.detail ||
          "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* HEADER */}

      <header className="border-b bg-white">

        <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-4">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Messages
            </h1>

            <p className="text-xs text-gray-500">
              Chat with your host
            </p>
          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col px-5 py-6">

        {/* MESSAGE BOX */}

        <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          {messages.length === 0 ? (

            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f3]">

                <MessageCircle
                  size={30}
                  className="text-[#e61e4d]"
                />

              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                Start a conversation
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Send a message to your host.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {messages.map((item, index) => (

                <div
                  key={item?.id || index}
                  className="flex justify-end"
                >

                  <div className="max-w-[75%] rounded-2xl rounded-br-md bg-[#e61e4d] px-4 py-3 text-white">

                    <p className="text-sm">
                      {item?.message_text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* MESSAGE INPUT */}

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">

          <div className="flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              className="
                h-12
                flex-1
                rounded-xl
                border
                border-gray-200
                px-4
                text-sm
                outline-none
                focus:border-[#e61e4d]
              "
            />

            <button
              type="button"
              onClick={handleSendMessage}
              disabled={
                sending ||
                !message.trim()
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#e61e4d]
                text-white
                hover:bg-[#d91545]
                disabled:bg-gray-300
              "
            >

              {sending ? (
                <span className="animate-spin">
                  ⟳
                </span>
              ) : (
                <Send size={19} />
              )}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Message;