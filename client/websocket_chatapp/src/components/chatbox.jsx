import React, { useEffect, useState, useRef} from "react";


export default function Chatbox({ socket, roomNum, username}) {
  const [message, setMessage] = useState("");
  const [messagelist, setMessageList] = useState([]);
  const messageEl = useRef(null);

  useEffect(() => {
    const messageListener = (data) => {
      setMessageList((prevList) => [...prevList, data.message]);
    };
    socket.on("receive_message", messageListener);
  }, [socket]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  useEffect(() => {
    setMessageList([]);
  }, [roomNum])

  const onSendMessage = async (e) => {
    e.preventDefault();
    const messageData = {
      room: roomNum,
      author: username,
      message: message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("send_message", { message: messageData });
    setMessageList((prevList) => [...prevList, messageData]);
    setMessage("");
  };

  return (
    <form className="flex flex-col justify-center items-center gap-y-3 mt-5">
      <div className="h-4/6 md:min-h-[400px] md:min-w-[400px] max-h-[415px] w-1/3 border border-yellow-100 rounded-md relative overflow-y-auto"  ref={messageEl}>
        <div className="sticky inset-0 border-yellow-500 border-8 rounded-lg blur "></div>

        <h1 className="absolute top-2 left-1 mx-5 font-semibold text-xl text-white">
          {" "}
          Joined Room: {roomNum}{" "}
        </h1>
        <div className="mt-14">
          {messagelist.map((messageContent, i) => (
            <p key={i} className=" mx-5 my-1 ">
              {messageContent.author === username ? (
                <div className="flex flex-start">
                  <span className="text-black text-xl bg-yellow-200 rounded-lg pl-1 pr-3">
                    {messageContent.message}
                  </span>
                </div>
              ) : (
                <div className="flex justify-end">
                  <span className="text-black text-xl bg-white rounded-lg pl-1 pr-3">
                    {messageContent.message}
                  </span>
                </div>
              )}
              <br />
              {messageContent.author === username ? (
                <div className="flex flex-start -mt-5">
                  <span className="text-white text-md pl-1 pr-3">
                    {messageContent.author}
                    {" " + messageContent.time}
                  </span>
                </div>
              ) : (
                <div className="flex justify-end -mt-5">
                  <span className="text-white text-md pl-1 pr-3">
                    {messageContent.author}
                    {" " + messageContent.time}
                  </span>
                </div>
              )}
            </p>
          ))}
          
        </div>
      </div>

      <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea
          id="chat"
          rows="1"
          className="block mx-4 p-2.5 w-full md:min-w-[200px] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button
          onClick={(e) => onSendMessage(e)}
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
        </button>
      </div>
    </form>
  );
}
