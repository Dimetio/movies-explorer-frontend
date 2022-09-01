import './Toasty.css';

export default function Toasty({success}) {
  return (
    <div className={`toasty ${success && 'toasty-show'}`}>
      <p className="toasty__text">Данные сохранены</p>
    </div>
  )
}
