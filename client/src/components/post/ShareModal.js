import {
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  TelegramShareButton, TelegramIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  RedditShareButton, RedditIcon
} from 'react-share'

const ShareModal = ({url}) => {
  return (
    <div className='shareModal'>
      <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32} />
      </FacebookShareButton>

      <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32} />
      </TwitterShareButton>

      <EmailShareButton url={url}>
        <EmailIcon round={true} size={32} />
      </EmailShareButton>
      
      <RedditShareButton url={url}>
        <RedditIcon round={true} size={32} />
      </RedditShareButton>

      <WhatsappShareButton url={url}>
        <WhatsappIcon round={true} size={32} />
      </WhatsappShareButton>

      <TelegramShareButton url={url}>
        <TelegramIcon round={true} size={32} />
      </TelegramShareButton>
    </div>
  )
}

export default ShareModal;