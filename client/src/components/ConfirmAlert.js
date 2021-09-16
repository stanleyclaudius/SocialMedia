
const ConfirmAlert = ({title, text, onConfirm, onCancel}) => {
  return (
    <div className='confirmAlert'>
      <div className="confirmAlert__box">
        <div className="confirmAlert__header">
          <h3>{title}</h3>
        </div>
        <div className="confirmAlert__body">
          <p>{text}</p>
          <div className="confirmAlert__button">
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAlert;