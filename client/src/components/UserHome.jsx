import React from 'react'

function UserHome(props) {
    const {name,dob,gender}=props.details
  return (
    <div>
        <h1>Welcome {name}</h1>
        <div>
            <p>Your date of birth is : {dob}</p>
            <p>Your gender is : {gender}</p>
        </div>
    </div>
  )
}

export default UserHome