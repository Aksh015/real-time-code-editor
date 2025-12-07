import React from 'react'
import Avatar from 'react-avatar'
const Client = (props) => {
    const username = props.username
  return (
    <div className='client'>
        <Avatar name={username} size='50' round="14px" textSizeRatio={2}  />
        <span className='userName'>{username}</span>
    </div>
  )
}

export default Client