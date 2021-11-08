import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// this component will manage all notifications aff our app
const Notif = () => {
  // in order to notify user when he has been logged out
  // we need to have the logout variable in the redux state
  const logout = useSelector((state) => state.user.logout);

  // in order to notify user when his profile has been updated
  // we need to have the notifUpdate and notifAvatar variables in the redux state
  const notifUpdate = useSelector((state) => state.user.details.notifUpdate);
  const notifAvatar = useSelector((state) => state.user.details.notifAvatar);

  // in order to notify user when his profile has been deleted
  // we need to have the notifDelete variable in the redux state
  const notifDelete = useSelector((state) => state.user.details.notifDelete);

  // in order to notify user when he submit a new service
  // we need to have the notifService variable in the redux state
  const notifService = useSelector((state) => state.services.new.notifService);

  // we display the notification when logout change and it is true
  useEffect(() => {
    if (logout) {
      toast.info('Vous avez été déconnecté');
    }
  }, [logout]);

  // we display a notification when the profile has been updated
  useEffect(() => {
    if (notifUpdate) {
      toast.success('Votre profil a bien été mis à jour !');
    }
  }, [notifUpdate]);

  // we display a notification when the avatar has been updated
  useEffect(() => {
    if (notifAvatar) {
      toast.success('Votre avatar a bien été mis à jour !');
    }
  }, [notifAvatar]);

  // we display a notification when the profile has been deleted
  useEffect(() => {
    if (notifDelete) {
      toast.success('Votre profil a été supprimé !');
    }
  }, [notifDelete]);

  // we display a notification when a service has been created
  useEffect(() => {
    if (notifService) {
      toast.success('Votre service a été ajouté !');
    }
  }, [notifService]);

  return (
    <ToastContainer />
  );
};

export default Notif;
