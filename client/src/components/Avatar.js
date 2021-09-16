const Avatar = ({src, size}) => {
  return (
    <div className={`avatar avatar--${size}`}>
      <img src={src} alt='User' />
    </div>
  )
}

export default Avatar;