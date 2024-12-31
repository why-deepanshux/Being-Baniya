import React from 'react'
import './styles.css'

const Button = ({text , onClick , blue , disabled}) => {
  return (
    <div class={blue ? "btn btn-blue" : "btn"} onClick={onClick} disabled={disabled}>
      {text}
    </div>
  )
}

export default Button
