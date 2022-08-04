import iconProfile from '../../images/profile_icon.svg'

export default function AuthUser() {
  return (
    <div className="header__links">
      <a href="/signup" className="header__link header__link-account">Аккаунт</a>
      <a href="/signin" className="header__link header__link-icon"><img src={iconProfile} alt="иконка профиля"/></a>
    </div>
  )
}
