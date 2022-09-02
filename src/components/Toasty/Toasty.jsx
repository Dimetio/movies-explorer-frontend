import './Toasty.css';

export default function Toasty({toastyText, showToasty, isSuccess}) {
  console.log(isSuccess)
  return (
    <div className={`toasty ${showToasty && 'toasty-show'} ${isSuccess ? 'toasty_success' : 'toasty__error'}`}>
      <p className="toasty__text">{toastyText}</p>
    </div>
  )
}