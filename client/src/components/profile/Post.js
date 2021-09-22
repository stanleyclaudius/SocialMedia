import PostThumbnail from "./../PostThumbnail";

const Post = ({userPost}) => {
  return (
    <div className='profilePost'>
      {
        userPost.map(post => (
          <PostThumbnail key={post._id} post={post} />
        ))
      }
    </div>
  )
}

export default Post;