import { FaVideoSlash, FaVideo, FaPhoneSlash, FaPhone } from 'react-icons/fa';

const SingleMessage = ({otherMessage, avatar, text, media, datetime, call}) => {
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

          {
            call && (
              <div className='singleMessage__callContainer'>
                {
                  call.video
                  ? call.times > 0
                    ? (
                      <>
                        <FaVideo style={{color: 'green'}} />
                        <div>
                          <span>{(parseInt(call.times/3600)).toString().length < 2 ? '0' + (parseInt(call.times/3600)) : (parseInt(call.times/3600))}</span>
                          <span> : </span>

                          <span>{(parseInt(call.times/60)).toString().length < 2 ? '0' + (parseInt(call.times/60)) : (parseInt(call.times/60))}</span>
                          <span> : </span>

                          <span>{(call.times%60).toString().length < 2 ? '0' + (call.times%60) : (call.times%60)}</span>
                        </div>
                      </>
                    )
                    : (
                      <>
                        <FaVideoSlash style={{color: 'red'}} />
                        <p>No Answer</p>
                      </>
                    )
                  : call.times > 0
                    ? (
                      <>
                        <FaPhone style={{color: 'green'}} />
                        <div>
                          <span>{(parseInt(call.times/3600)).toString().length < 2 ? '0' + (parseInt(call.times/3600)) : (parseInt(call.times/3600))}</span>
                          <span> : </span>

                          <span>{(parseInt(call.times/60)).toString().length < 2 ? '0' + (parseInt(call.times/60)) : (parseInt(call.times/60))}</span>
                          <span> : </span>

                          <span>{(call.times%60).toString().length < 2 ? '0' + (call.times%60) : (call.times%60)}</span>
                        </div>
                      </>
                    )
                    : (
                      <>
                        <FaPhoneSlash style={{color: 'red'}} />
                        <p>No Answer</p>
                      </>
                    )
                }
              </div>
            )
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