import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete, MdOutlineCheck } from 'react-icons/md';
import Modal from 'src/components/Modal';
import './style.scss';

const Admin = () => {
  // in this page, we need :
  // - the not published services
  // - the published services
  // - all users
  const { notPublishedServices, users } = useSelector((state) => state.admin);
  const publishedServices = useSelector((state) => state.services.items);

  // we also need categories to display image from categories on each service
  const categories = useSelector((state) => state.categories.items);

  // we need local state variables to display modal
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState({});

  // we display the modal when their props are updated and not empty object
  useEffect(() => {
    if (Object.keys(modalAction).length > 0) {
      setShowModal(true);
    }
  }, [modalAction]);

  return (
    <main className="admin">
      {/* We display the modal when showModal is true */}
      {showModal && (
        <Modal
          action={modalAction}
          cancelAction={() => setShowModal(false)}
        />
      )}
      <div className="admin__container">
        <div className="admin__services">
          <h2 className="admin__title">Services non publiés</h2>
          <div className="admin__services-container">
            {notPublishedServices.map((service) => (
              <div key={service.id} className="service-card">
                <span className="service-card__title">{service.title}</span>
                <img
                  className="service-card__image"
                  // Here we will use the image of the category of the service
                  src={categories.find((category) => category.id === service.category_id).image}
                  alt={service.title}
                />
                <div className="service-card__actions">
                  <MdDelete
                    className="service-card__delete"
                    onClick={() => setModalAction({
                      type: 'delete',
                      target: 'service',
                      role: 'admin',
                      id: service.id,
                    })}
                  />
                  <MdOutlineCheck
                    className="service-card__publish"
                    onClick={() => setModalAction({
                      type: 'publish',
                      target: 'service',
                      role: 'admin',
                      id: service.id,
                    })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="admin__services">
          <h2 className="admin__title">Services en ligne</h2>
          <div className="admin__services-container">
            {publishedServices.map((service) => (
              <div key={service.id} className="service-card">
                <Link className="service-card__link" to={`/service/${service.id}`}>
                  <span className="service-card__title">{service.title}</span>
                  <img
                    className="service-card__image"
                    // Here we will use the image of the category of the service
                    src={categories.find((category) => category.id === service.category_id).image}
                    alt={service.title}
                  />
                </Link>
                <MdDelete
                  className="service-card__delete"
                  onClick={() => setModalAction({
                    type: 'delete',
                    target: 'service',
                    role: 'admin',
                    id: service.id,
                  })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="admin__users">
          <h2 className="admin__title">Utilisateurs</h2>
          <div className="admin__users-container">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <span className="user-card__name">{`${user.firstname} ${user.lastname}`}</span>
                <img
                  className="user-card__avatar"
                  // Here we will use the image of the category of the service
                  src={user.avatar_url}
                  alt={`AVatar de ${user.firstname} ${user.lastname}`}
                />
                <MdDelete
                  className="user-card__delete"
                  onClick={() => setModalAction({
                    type: 'delete',
                    target: 'user',
                    role: 'admin',
                    id: user.id,
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
