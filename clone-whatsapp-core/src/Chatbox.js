import React from "react";
import "./Chatbox.css";
import { Avatar, IconButton } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
//import SelectInput from "@material-ui/core/Select/SelectInput";
function Chatbox({messages}) {
  return (
    <div className="chatbox">
      <div className="chatbox__header">
        <Avatar />
        <div className="chatbox__headerInfo">
          <h3>Room Name</h3>
          <p>Last Seen At....</p>
        </div>
        <div className="chatbox__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbox__chatBody">
        {messages.map((message)=>(
          <p className={`chatbox__message ${message.sender && "chatbox__reciever"}`} >
          <span className="chatbox__name">{message.name}</span>
          {message.message}
          <span className="chatbox__timeStamp">{message.timestamp}</span>
        </p>
        ))}
        
      </div>
      <div className="chatbox__footer">
        <InsertEmoticonIcon />
        <form>
          <input placeholder="Type a Message" type="text" />
          <button onClick="" type="submit">
            Send a message.
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chatbox;
