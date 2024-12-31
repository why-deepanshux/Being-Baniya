import React from 'react'
import './styles.css'
const Input = ({label ,state , setState, placeholder , type}) => {
  return (
    <div class="input-wrapper">
      <p class="label-input">{label}</p>
      <input
        placeholder={placeholder}
        value={state}
        onChange={(e)=>setState(e.target.value)}
        class="custom-input"
        type={type}
      />
      
    </div>
  )
}

export default Input
