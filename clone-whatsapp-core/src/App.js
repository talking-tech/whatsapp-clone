import React, {useEffect, useState} from 'react';
import Chatbox from './Chatbox';
import Sidebar from './Sidebar';
import './App.css';
import Pusher from 'pusher-js';
import axios from './axios.js';

function App() {
  const [messages,setMessages] = useState([]);
  //Pusher Session goes here  
  useEffect(()=>{
    axios.get("/messages/sync/").then((response)=>{
      setMessages(response.data);
    });
  },[]);
  useEffect(()=>{
    const pusher = new Pusher('7c7ba4a6b6590c6a39b6', {
      cluster: 'ap2'
    });
//, Event: inserted
    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data)=>{
      //alert(JSON.stringify(data));
      setMessages([...messages,data]);
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);
  console.log(messages);
  //returns
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chatbox messages={messages}/>
      </div>
    </div>
  );
}

export default App;
