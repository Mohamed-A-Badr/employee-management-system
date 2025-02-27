/* eslint-disable react/prop-types */
import './Input.css'

const Input = ({
  type,
  id,
  name,
  label,
  placeholder,
  autoFocus,
  value,
  onChange
}) => {
  return (
    <label className='input-label'>
      {label}
      <input 
        className='input-field'
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoFocus={autoFocus}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default Input