import { useRef, useEffect } from 'react';

const Alert = () => {
  const alertRef = useRef();

  useEffect(() => {
    const removeAlert = setTimeout(() => {
      alertRef.current.style.opacity = '0';
    }, 3000);

    return () => clearTimeout(removeAlert);
  }, []);

  return (
    <div ref={alertRef} className='alert alert--success'>
      <div className="alert__header">
        <h4>Error</h4>
      </div>
      <div className="alert__body">
        <p>An error has occured</p>
      </div>
    </div>
  )
}

export default Alert;