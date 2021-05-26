import React, {useEffect, useState} from 'react'
import {Avatar} from "@material-ui/core"
import './SidebarChat.css'
import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'

function SidebarChat({id, name, addNewChat}) {
    const {roomId} = useParams();

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    return !addNewChat ? (
        <Link to={`/rooms/`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
            </div>
        </Link>
    ) : (
        <div
        className="sidebarChat"
        >
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
