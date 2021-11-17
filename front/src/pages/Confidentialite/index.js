import './style.scss';

const Confidentialite = () => (
  <>
    <main className="conditions">
      <div className="conditions__header">
        <h1 className="conditions__header__title">
          Politique de confidentialité et mentions légales
        </h1>
      </div>
      <div className="conditions__container">
        <h2 className="conditions__container__title">
          Propriété intellectuelle
        </h2>
        <p className="conditions__container__text">
          Toutes les données de : textes, photographies, illustrations,
          icônes, bases de données, etc… Sont la propriété exclusive de
          MentorMe. Toute utilisation fait l’objet d’une autorisation
          spécifique à demander auprès de l’équipe de MentorMe.
        </p>
        <h2 className="conditions__container__title">Confidentialité</h2>
        <p className="conditions__container__text">
          MentorMe pourra procéder à des analyses statistiques sans que
          celles-ci soient nominatives et pourra en informer des tiers
          (organismes d’évaluation de fréquentation) sous une forme résumée et
          non nominative. Ce site est la propriété de MentorMe - FRANCE.
          MentorMe n’enregistre pas d’informations personnelles permettant
          l’identification, à l’exception des formulaires que l’utilisateur
          est libre de remplir. Ces informations ne seront pas utilisées sans
          votre accord, nous les utiliserons uniquement pour vous contacter et
          permettre aux autres utilisateurs de vous contacter. « Les
          informations recueillies sur les sites bénéficient de la protection
          de la loi « Informatique et Libertés » n° 78-17 du 06 janvier 1978.
          Elles bénéficient d’un droit d’accès, de rectification, d’opposition
          à communication et de suppression sur simple demande à MentorMe via
          le formulaire de contact.
        </p>
        <h2 className="conditions__container__title">Liens hypertexte</h2>
        <p className="conditions__container__text">
          MentorMe ne contrôle pas les sites en connexion avec le sien, et ne
          saurait donc être responsable de leur contenu. Les risques liés à
          l’utilisation de ces sites incombent pleinement à l’utilisateur. Il
          se conformera à leurs conditions d’utilisation.
        </p>
        <h2 className="conditions__container__title">Hébergement</h2>
        <p className="conditions__container__text">
          <a href="https://www.heroku.com/home">Heroku pour le back</a>
          <br />
          <a href="https://www.netlify.com/">Netlify pour le front</a>
        </p>
      </div>
    </main>
  </>
);

export default Confidentialite;
