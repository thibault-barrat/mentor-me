import { useSelector } from 'react-redux';
import { useState } from 'react';
import ServiceModal from 'src/components/ServiceModal';
import UserModal from 'src/components/UserModal';
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

  // we need local state variables to display service modal and user modal
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceModalProps, setServiceModalProps] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalProps, setUserModalProps] = useState({});

  return (
    <main className="admin">
      {/* We display the service modal when showServiceModal is true */}
      {showServiceModal && (
        <ServiceModal
          service={serviceModalProps}
          closeAction={() => setShowServiceModal(false)}
        />
      )}
      {/* We display the user modal when showUserModal is true */}
      {showUserModal && (
        <UserModal
          user={userModalProps}
          closeAction={() => setShowUserModal(false)}
        />
      )}
      <div className="admin__container">
        <div className="admin__services">
          <h2 className="admin__title">Services non publiés</h2>
          <div className="admin__services-container">
            {notPublishedServices.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => {
                  setServiceModalProps(service);
                  setShowServiceModal(true);
                }}
              >
                <span className="service-card__title">{service.title}</span>
                <img
                  className="service-card__image"
                  // Here we will use the image of the category of the service
                  src={categories.find((category) => category.id === service.category_id).image}
                  alt={service.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="admin__services">
          <h2 className="admin__title">Services en ligne</h2>
          <div className="admin__services-container">
            {publishedServices.map((service) => (
              <div
                key={service.id}
                className="service-card"
                onClick={() => {
                  setServiceModalProps(service);
                  setShowServiceModal(true);
                }}
              >
                <span className="service-card__title">{service.title}</span>
                <img
                  className="service-card__image"
                  // Here we will use the image of the category of the service
                  src={categories.find((category) => category.id === service.category_id).image}
                  alt={service.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="admin__users">
          <h2 className="admin__title">Utilisateurs</h2>
          <div className="admin__users-container">
            {users.map((user) => (
              <div
                key={user.id}
                className="user-card"
                onClick={() => {
                  setUserModalProps(user);
                  setShowUserModal(true);
                }}
              >
                <span className="user-card__name">{`${user.firstname} ${user.lastname}`}</span>
                <img
                  className="user-card__avatar"
                  // Here we will use the image of the category of the service
                  src={user.avatar_url}
                  alt={`AVatar de ${user.firstname} ${user.lastname}`}
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
