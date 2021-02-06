import React, { useState, useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic"
import InsertEmoticon from "@material-ui/icons/InsertEmoticon"
import { AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import db from './configuration/firebase'
import {useParams} from "react-router-dom"
import {useStateValue} from "./StateProvider"
import firebase from 'firebase'

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessage] = useState([]);
    const { roomId } = useParams();
    const [{user}, dispatcher] = useStateValue();
    

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestampe', 'asc')
            .onSnapshot((snapshot) => 
                setMessage(snapshot.docs.map((doc) => 
                    doc.data()))
                )

        }
        console.log(roomId)
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("You typed >>> ", input)

        db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .add({
                message: input,
                name: user.displayName,
                timestampe: firebase.firestore.FieldValue
                .serverTimestamp(),
            })

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at{" "}
                    {new Date(
                        messages[messages.length - 1]?.
                        timestampe?.toDate())
                        .toUTCString()}
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message 
                    ${message.name === user.displayName && "chat__reviever"}`}>
                    <span className="chat__name">
                        {message.name}
                    </span>
                        {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestampe?.toDate())
                        .toUTCString()}
                    </span>
                </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} 
                    onChange={e => setInput(e.target.value)} 
                    placeholder="Type a message"
                    type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>    
        </div>
    )
}

export default Chat
