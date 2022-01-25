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
  const notifDeleteUser = useSelector((state) => state.user.details.notifDelete);

  // in order to notify user when he submit a new service
  // we need to have the notifService variable in the redux state
  const notifService = useSelector((state) => state.services.new.notifService);

  // in order to notify when a service has been deleted
  // we need to have the notifDeleteService variable in the redux state
  const notifDeleteService = useSelector((state) => state.services.notifDelete);

  // in order to notify user when he created his account
  // we need to have the notifRegister variable in the redux state
  const notifRegister = useSelector((state) => state.user.register.notifRegister);

  // in order tonotify admin when he published a service
  // we need to have the notifPublish variable in the redux state
  const notifPublish = useSelector((state) => state.admin.notifPublish);

  // in order to notfy user when he has unliked a service
  // we need to have the notifUnlike variable in the redux state
  const notifUnlike = useSelector((state) => state.services.notifUnlike);

  // in order to notfy user when he has submitted a message
  // we need to have the notifMessage variable in the redux state
  const notifMessage = useSelector((state) => state.messages.notifMessage);

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
    if (notifDeleteUser) {
      toast.success('Le profil a été supprimé !');
    }
  }, [notifDeleteUser]);

  // we display a notification when a service has been created
  useEffect(() => {
    if (notifService) {
      toast.success('Votre service est en attente de validation par un administrateur !');
    }
  }, [notifService]);

  // we display a notification when a service has been deleted
  useEffect(() => {
    if (notifDeleteService) {
      toast.success('Le service a été supprimé !');
    }
  }, [notifDeleteService]);

  // we display a notification when a user has been created
  useEffect(() => {
    if (notifRegister) {
      toast.success('Votre compte a été créé ! Vous pouvez vous connecter.');
    }
  }, [notifRegister]);

  // we display a notification when admin publishes a service
  useEffect(() => {
    if (notifPublish) {
      toast.success('Le service a été publié.');
    }
  }, [notifPublish]);

  // we display a notification when user has unliked a service
  useEffect(() => {
    if (notifUnlike) {
      toast.success('Le service a été retiré de vos favoris !');
    }
  }, [notifUnlike]);

  // we display a notification when user has submitted a message
  useEffect(() => {
    if (notifMessage) {
      toast.success('Votre message a bien été envoyé !');
    }
  }, [notifMessage]);

  return (
    <ToastContainer />
  );
};

export default Notif;
