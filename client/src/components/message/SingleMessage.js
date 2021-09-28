
const SingleMessage = ({otherMessage, avatar, text, media}) => {
  return (
    <div className='singleMessage'>
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
        <div className='singleMessage__rightImage'>
          {
            media.length > 0 &&
            <>
              {
                media.map(item => (
                  <>
                    {
                      item.secure_url.match(/video/i)
                      ? <video src={item.secure_url} controls />
                      : <img src={item.secure_url} alt='Message' />
                    }
                  </>
                ))
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default SingleMessage;