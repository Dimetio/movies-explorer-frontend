import './Input.css';

export default function Input({
  inputTitle,
  inputClass,
  labelClass,
  name,
  type,
  value,
  placeholder,
  onChange
  }) {

    function handleChange(e) {
      onChange({[name]: e.target.value})
    } 

  return (
    <>
      <label className={`input-label ${labelClass}`}>
        <span className="input-placeholder">{inputTitle}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className={`input ${inputClass}`}
          value={value}
          onChange={handleChange}
        />
      </label>
      <span className="input-error">Что-то пошло не так...</span>
    </>
  )
}
