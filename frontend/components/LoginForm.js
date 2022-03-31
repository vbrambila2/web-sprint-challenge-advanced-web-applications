import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const [disabled, setDisabled] = useState(true)
  // ✨ where are my props? Destructure them here
  const { login } = props;

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })

    const username_input = document.getElementById("username");
    const newUser = username_input.value
    const password_input = document.getElementById("password");
    const newPass = password_input.value

    if (newPass.trim().length < 8) {
      setDisabled(true) 
    } else if (newUser.trim().length < 3) {
      setDisabled(true) 
    } else {
      setDisabled(false)
    }
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    login(values)
  }

  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={disabled} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
