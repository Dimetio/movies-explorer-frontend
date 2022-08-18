import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className="about-project container" id="AboutProject">
      <h2 className="section__title">О проекте</h2>

      <div className="about-project__desc">
        <div className="about-project__wrap">
          <p className="about-project__text">Дипломный проект включал 5 этапов</p>
          <p className="about-project__text-small">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__wrap">
          <p className="about-project__text">На выполнение диплома ушло 5 недель</p>
          <p className="about-project__text-small">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <div className="calendar">
        <div className="calendar__wrap calendar__wrap-short">
          <div className="calendar__week calendar__week-backend">1 неделя</div>
          <p className="calendar__note">Back-end</p>
        </div>
        <div className="calendar__wrap">
        <div className="calendar__week calendar__week-frontend">4 недели</div>
          <p className="calendar__note">Front-end</p>
        </div>
      </div>
    </section>
  )
}