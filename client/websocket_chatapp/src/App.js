import React, { useState } from "react";
import io from "socket.io-client";
import backgroundImage from "./assets/stars.jpg"; // Import the background image
import Chatbox from "./components/chatbox";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("Guest");
  // const [numofPeople, setNumofPeople] = useState(1);
  const [showChat, setShowChat] = useState(false);
  

  const [roomNum, setRoomNum] = useState(1);
  const rooms = [1, 2, 3, 4, 5];

  const joinRoom = (room) => {
    socket.emit("join_room", room);
    setRoomNum(room);
    setShowChat(true);
  };
 



  return (
    <div className="min-h-screen bg-black">
      <div
        className="bg-repeat ... w-screen h-screen grid grid-cols-4 gap-4"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen col-span-1 sm:min-w-[100px] md:min-w-[300px] max-w-lg border-r-4 border-yellow-200 bg-black">
          <h1 className="text-white text-center text-2xl font-bold my-5">
            Rooms
          </h1>
          <hr className="border-2 min-w-[150px] max-w-full mb-8" />

          {rooms.map((room) => (
            <button
              className=" text-gray-200 font-semibold text-center border-2 border-gray-500  rounded-lg my-5 hover:bg-slate-400"
              key={room}
              onClick={() => {
                joinRoom(room);
              }}
            >
              {" "}
              <p className="text-xl mx-3 my-2">Room: {room}</p>
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center col-span-3">
          <div>
            <h1 className="text-5xl font-bold flex justify-center items-center py-10 gradient-text text-transparent animate-gradient">
              Nightly Chatrooms
            </h1>

            {showChat ? (
              <div className="flex flex-row gap-x-20 justify-between items-center ">
                {/* <div className="text-white text-2xl font-semibold">
                  Number of People: <br />{" "}
                  <div className="text-center">{numofPeople}</div>
                </div> */}
                <Chatbox
                  socket={socket}
                  roomNum={roomNum}
                  username={username}
                />
                <div className="text-white text-2xl font-semibold">
                  Logged In as:{" "}
                  <input
                    className="text-black font-semibold text-center my-3 max-w-[150px]"
                    placeholder={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-white text-3xl font-bold text-center">
                  Join a Room{" "}
                </h1>
                <p className="text-white text-2xl font-semibold">
                  Enter Your Name:
                  <input
                    className="text-black font-semibold text-center  mx-10 my-10 max-w-[150px]"
                    placeholder={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </p>

                <div className="flex justify-center items-center">
                  <button onClick={() => {joinRoom(1)}} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Join Room
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
