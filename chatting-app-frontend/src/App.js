import './App.css';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login'
import {useStateValue} from "./StateProvider"
import Pusher from 'pusher-js'
import axios from './axios'

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(res => {
        setMessages(res.data)
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('757d8dbe153432c57d39', {
      cluster: 'ap3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [])

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
         <Router>
          <Sidebar />
          <Switch>  
            <Route path="/rooms/:roomId" >
              <Chat />
            </Route>
            <Route path="/" >
              <Chat />
            </Route>
          </Switch>  
        </Router>
      </div>
    </div>
  );
}

export default App;
