import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import backgroundImage from "./assets/stars.jpg"; // Import the background image

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const [currentUsers, setCurrentUsers] = useState([
    { Name: "You", ID: 0, profilePic: "" },
  ]);

  const onSendMessage = () => {
    socket.emit("send_message", { message: message });
    // Optionally clear the message input after sending
    setMessage("");
  };

  useEffect(() => {
    const messageListener = (data) => {
      console.log(data);
      setMessageReceived(data.message);
    };

    socket.on("receive_message", messageListener);

    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      socket.off("receive_message", messageListener);
    };
  }, [socket]);

  return (
    <div className="min-h-screen bg-black">
      <div
        className="bg-repeat ... w-screen h-screen grid grid-cols-4 gap-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="min-h-screen col-span-1 sm:min-w-[100px] md:min-w-[300px] max-w-lg border-r-4 border-yellow-200 bg-black">
          <h1 className="text-white text-center text-2xl font-bold my-5">
            Connected <br /> Users
          </h1>
          <hr className="border-2 mx-4" />
        </div>

        <div className="flex justify-center items-center col-span-3">
          <div>
            <h1 className="text-yellow-300 text-5xl font-bold flex justify-center items-center py-10">
              Starry Night Chat App
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSendMessage();
              }}
              className="flex flex-col justify-center items-center gap-y-3 mt-5"
            >
              <div className="h-4/6 md:min-h-[400px] max-h-screen w-1/3 border border-yellow-100 rounded-md relative">
                <div className="absolute inset-0 border-yellow-500 border-8 rounded-lg blur"></div>
              </div>

              <form>
                <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        fill="currentColor"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                      />
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
                      />
                    </svg>
                    <span className="sr-only">Add emoji</span>
                  </button>
                  <textarea
                    id="chat"
                    rows="1"
                    class="block mx-4 p-2.5 w-full md:min-w-[200px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your message..."
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></textarea>
                  <button
                    type="submit"
                    onClick={onSendMessage}
                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-5 h-5 rotate-90 rtl:-rotate-90"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                    </svg>
                    <span class="sr-only">Send message</span>
                  </button>
                </div>
              </form>
              <h1 className="text-white">
                Message Received: {messageReceived}
              </h1>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
