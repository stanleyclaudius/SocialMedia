
const SingleMessage = ({otherMessage, avatar, text}) => {
  return (
    <div className='singleMessage'>
      <div className="singleMessage__left">
        <img src={avatar} alt='User' />
      </div>
      <div className="singleMessage__right">
        <p className={`${otherMessage ? 'otherMessage' : 'yourMessage'}`}>
          {text}
        </p>
      </div>
    </div>
  )
}

export default SingleMessage;