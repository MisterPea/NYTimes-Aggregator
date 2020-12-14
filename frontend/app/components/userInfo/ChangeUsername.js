import React, { useState } from 'react'
import PropTypes from "prop-types"

export default function ChangeUsername({user,refrence}){
    const [newUsername, setNewUsername] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setNewUsername(e.target.value)
    }

    const handleClick = () => {
        user.updateProfile({displayName:newUsername})
            .then(() => {
                setSubmitted(true)
                setError(false)
                handleRef(newUsername)
            })
            .catch((err) => {
                setError(err)
                setSubmitted(true)
            })
    }

    const changeUsernamePre = (
        <>
            <input value={newUsername} onChange={(e) => {handleChange(e)}} placeholder="Enter new username" />
            <button onClick={() => {handleClick()}}>Submit</button>
        </>
    )

    const changeUsernamePost = (
        <>
          {!error? <p>Your username has been updated.</p> : <p>{`There has been an error: ${error}`}</p>}
        </>
    )
    
    const handleRef = (newName) => {
        refrence(newName)
    }

    return (
        <>
            {!submitted ? changeUsernamePre : changeUsernamePost}
        </>
    )
}

ChangeUsername.propTypes = {
    user:PropTypes.object,
    refrence:PropTypes.func
}