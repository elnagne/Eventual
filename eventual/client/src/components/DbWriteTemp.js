import React from 'react'
import SidebarPro from './SidebarPro'
import { useState } from 'react'

/*
 * This is a temporary component that exists in order to prove that we can write to the database.
 */

const DbWriteTemp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayMsg, setDisplayMsg] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const newAccount = {
            username: username,
            password: password,
            email: email,
            name: {first: firstName, last: lastName}
        }

        await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            window.alert(error);
            return;
        })

        setDisplayMsg(`You sent: ${JSON.stringify(newAccount)}`);
        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
    }

    return (
        <div className="dbWriteWrapper">
            <SidebarPro/>
            <div className="dbWriteContent">
                <h3>This is a temporary page that exists in order to prove that we can write data to the database.</h3>
                <form className='writeForm' onSubmit={onSubmit}>
                    <div className='writeFormControl'>
                        <label>Username</label>
                        <input type='text' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='writeFormControl'>
                        <label>Password</label>
                        <input type='text' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='writeFormControl'>
                        <label>Email</label>
                        <input type='text' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='writeFormControl'>
                        <label>First name</label>
                        <input type='text' placeholder='Enter first name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className='writeFormControl'>
                        <label>Last name</label>
                        <input type='text' placeholder='Enter last name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                    <input type='submit' value='Send'/>
                </form>
                {displayMsg.length >0 && (<p>{displayMsg}</p>)}
            </div>
        </div>
    )
}

export default DbWriteTemp