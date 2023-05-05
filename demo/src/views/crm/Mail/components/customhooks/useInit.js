import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

export const InitializeGoogle = () => {

const [user, setUser] = useState({})

const [mail, setMail] = useState({})

const host = 'http://localhost:3000/app/crm/mail'

function handleSignOut() {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
}

function handleCallbackResponse(response) {
    console.log("encoded JWT ID token: " + response.credential)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    setUser(userObject)
    document.getElementById('signInDiv').hidden = true;
}
    useEffect(() => {
        /* global google */ 
        const client = window.google.accounts.id.initialize({
            client_id: '740835977957-jb28gm8ioe4l6oot5qais510ep1nalkv.apps.googleusercontent.com',
            ux_mode: 'popup',
            scope: 'https://mail.google.com/',
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large'}
        );

        async function exampleFetch() {
            const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages');
            const json = await response.json();
            console.log(json);
        }
        
        exampleFetch()

    });
}
 