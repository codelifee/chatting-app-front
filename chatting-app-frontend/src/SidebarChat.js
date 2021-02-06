import React, {useEffect, useState} from 'react'
import {Avatar} from "@material-ui/core"
import './SidebarChat.css'
import db from './configuration/firebase'
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

function SidebarChat({id, name, addNewChat}) {
    const {roomId} = useParams();

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");

        if(roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);



    useEffect(() => {

        // console.log(id)
        console.log(roomId);
        //here roomId == undefined and id has value. 
        //However when I put id, it throws undefined error,
        //I should put roomId to work with. I don't understand
        
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestampe', 'desc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) =>                
                doc.data()))
            ))
        }
        console.log(messages)
    },[id])

    // reusing return value
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat}
        className="sidebarChat"
        >
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
