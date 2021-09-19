import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

const Alert = () => {
  const {alert} = useSelector(state => state);
  const showAlert = useAlert();

  useEffect(() => {
    if (alert.error) {
      showAlert.error(alert.error);
    }
  }, [showAlert, alert.error]);

  useEffect(() => {
    if (alert.success) {
      showAlert.success(alert.success);
    }
  }, [showAlert, alert.success]);

  return (
    <></>
  )
}

export default Alert;