import PostCard from './../../components/post/PostCard';
import HeadInfo from './../../utils/HeadInfo';

const Post = () => {
  return (
    <>
      <HeadInfo title={`SR Social - Post`} />
      <div className='container' style={{marginTop: '40px'}}>
        <PostCard />
      </div>
    </>
  )
}

export default Post;