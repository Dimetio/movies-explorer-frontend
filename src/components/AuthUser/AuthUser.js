import iconProfile from '../../images/profile_icon.svg'

export default function AuthUser() {
  return (
    <div className="header__links burger__links">
      <a href="/profile" className="header__link header__link-account">Аккаунт</a>
      <a href="/profile" className="header__link header__link-icon"><img src={iconProfile} alt="иконка профиля"/></a>
    </div>
  )
}
