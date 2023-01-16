import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatBar from "../components/chat/ChatBar/ChatBar";
import Profile from "../../assets/Profile2.jpg";
import { io } from "socket.io-client";
import sidebar from "../components/chat/ChatBar/style.module.css";
import right from "../components/chat/ChatBody/style.module.css";
import footer from "../components/chat/ChatFooter/style.module.css";
import { Image } from "react-bootstrap";
import ChatBody from "../components/chat/ChatBody/ChatBody";
import Profile2 from "../../assets/Profile2.jpg";
import Hover from "../../assets/Hover.png";
import { useNavigate } from "react-router-dom";
import { data } from "autoprefixer";

const Home = () => {
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);
  const [message, setMessage] = useState();
  const [login, setLogin] = useState({});
  const [list, setList] = useState([]);
  const [activeReceiver, setActiveReceiver] = useState({});
  const [activeChat, setActiveChat] = useState(1);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const self = user.data;
  const friend = JSON.parse(localStorage.getItem("receiver"));
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const data = user.data;
    setLogin(user);
    axios
      .get(`http://localhost:3009/users/all`)
      .then((response) => {
        console.log(response);
        setList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:3009/");
    socket.on("send-message-response", (response) => {
      // set receiver
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
      }
    });
    setSocketIo(socket);
  }, []);

  const SubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));

    // list history saat submit message
    const payload = {
      sender: user.data.username,
      receiver: receiver.username,
      message,
    };

    setListchat([...listchat, payload]);

    const data = {
      sender: user.data.id,
      receiver: activeReceiver.id,
      message,
    };

    socketio.emit("send-message", data);

    setMessage("");
  };

  const selectReceiver = (item) => {
    setListchat([]);
    setActiveReceiver(item);
    setActiveChat(2);

    //set receiver
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login.data);

    const data = {
      sender: login.data.id,
      receiver: item.id,
    };

    socketio.emit("chat-history", data);
  };
  console.log(self);

  const handleLeaveChat = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="flex">
      {/* //sidebar */}
      <div className={sidebar.sidebar}>
        <div className="h-screen overflow-y-auto">
          <h2 style={{ color: "#7e98df", fontWeight: "700" }}>Chat App</h2>
          <div className="row">
            <div className="row">
              <div className="flex-col items-center justify-items-center">
                <img className="" src={self.photo}></img>

                <h4 className="self-center flex">{self.username}</h4>
              </div>
            </div>
          </div>
          <div className="grid">
            <h4 className={sidebar.header}>Friend List</h4>
            <div className={sidebar.users}>
              {list.map((user) => (
                <div
                  className="card w-96 bg-base-100 shadow-sm rounded-lg"
                  onClick={() => selectReceiver(user)}
                  key={user.id}
                >
                  <div className="card-body flex flex-row ">
                    <div>
                      <img src={Profile2} />
                    </div>
                    <div>
                      <p>{user.username}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-auto">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* chat body */}
      <div className="grow h-14">
        <header className={right.Header}>
          <h3 className="text-[#7e98df] font-semibold"> {friend.username}</h3>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn m-1">
              <img src={Hover} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={handleLeaveChat}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </header>
        <div className={right.chatContainer}>
          {listchat.map((item) => (
            <div key={item.id}>
              {item.sender === login.data.username ? (
                <div className={right.chats}>
                  <div className="chat chat-end">
                    <p className={right.senderName}>You</p>
                    <div className="chat-bubble chat-bubble-info">
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={right.chats}>
                  <p>{item.username}</p>
                  <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-primary">
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={footer.footer}>
          <form className={footer.form} onSubmit={SubmitMessage}>
            <input
              type="text"
              placeholder="Type your messages...."
              className={footer.message}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;
