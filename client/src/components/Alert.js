import { useSelector } from 'react-redux';

const Alert = () => {
  const {alert} = useSelector(state => state);

  return (
    <div className={`alert alert--${alert.error ? 'error' : alert.success ? 'success' : ''}`}>
      {
        alert.error && (
          <>
            <div className="alert__header">
              <h4>Error</h4>
            </div>
            <div className="alert__body">
              <p>{alert.error}</p>
            </div>
          </>
        )
      }

      {
        alert.success && (
          <>
            <div className="alert__header">
              <h4>Success</h4>
            </div>
            <div className="alert__body">
              <p>{alert.success}</p>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Alert;