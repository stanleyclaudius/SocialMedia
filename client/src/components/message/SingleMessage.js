
const SingleMessage = ({otherMessage, avatar, text, media, datetime}) => {
  return (
    <div className='singleMessage'>
      <div className={`singleMessage__upper ${otherMessage ? '' : 'singleMessage__upper--reverse'}`}>
        <div className="singleMessage__left">
          <img src={avatar} alt='User' />
        </div>
        <div className="singleMessage__right">
          {
            text &&
            <p className={`${otherMessage ? 'otherMessage' : 'yourMessage'}`}>
              {text}
            </p>
          }
        </div>
      </div>

      <div className={`singleMessage__image ${otherMessage ? 'singleMessage__image--other' : 'singleMessage__image--own'}`}>
        {
          media.length > 0 &&
          <>
            {
              media.map(item => (
                <div key={item.secure_url}>
                  {
                    item.secure_url.match(/video/i)
                    ? <video src={item.secure_url} controls />
                    : <img src={item.secure_url} alt='Message' />
                  }
                </div>
              ))
            }
          </>
        }
        <p
          style={{
            color: '#aaa',
            fontSize: '14px',
            marginTop: '6px'
          }}
        >{new Date(datetime).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default SingleMessage;