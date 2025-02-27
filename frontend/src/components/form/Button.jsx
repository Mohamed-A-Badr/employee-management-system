/* eslint-disable react/prop-types */
import './Button.css'

const Button = ({type, value}) => {
  return (
    <button type={type} value={value} className='button-primary'>
      {value}
    </button>
  )
}

export default Button