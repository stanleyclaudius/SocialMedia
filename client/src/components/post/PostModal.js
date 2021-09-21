import { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiFillCamera, AiFillPicture } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { createPost, editPost } from './../../redux/actions/postActions';
import ConfirmAlert from './../ConfirmAlert';

const checkErr = ({content, images}) => {
  let err = {};

  if (!content) {
    err.content = 'Please provide content for this post.';
  }

  if (images.length === 0) {
    err.images = 'Please provide images for this post.';
  } else if (images.size > 1024 * 1024 * 5) {
    err.images = 'Maximum media size is 5MB.';
  }

  return err;
}

const PostModal = ({post, setIsOpenMenu, setIsOpenModal}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const videoRef = useRef();
  const canvasRef = useRef();

  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleCloseModal = () => {
    if (post) {
      setIsOpenModal(false);
    } else {
      if (content || images.length > 0) {
        setOpenConfirm(true);
      } else {
        setStream(false);
        tracks && tracks.stop();
        setIsOpenModal(false);
      }
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {}
      });
    }
  }

  const handleImageChange = e => {
    const files = [...e.target.files];
    const newImages = [];

    files.forEach(file => {
      newImages.push(file);
    });

    setImages([...images, ...newImages]);
  }

  const deleteImage = index => {
    const imgCopy = [...images];
    imgCopy.splice(index, 1);
    setImages(imgCopy);
  }

  const handleStartStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(mediaStream => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch(err => console.log(err));
    }
  }

  const handleStopStream = () => {
    setStream(false);
    tracks.stop();
  }

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    canvasRef.current.setAttribute('width', width);
    canvasRef.current.setAttribute('height', height);

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let cameraImageURL = canvasRef.current.toDataURL();
    setImages([...images, {camera: cameraImageURL}]);

    setStream(false);
    tracks.stop();
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const err = checkErr({content, images});
    if (Object.keys(err).length !== 0) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err
      })
    } else {
      if (post) {
        setIsOpenMenu(false);
        await dispatch(editPost({content, images, post, auth}));
      } else {
        await dispatch(createPost({content, images, auth}));
      }
      setIsOpenModal(false);
      tracks && tracks.stop();
    }
  }

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setImages(post.images);
    }
  }, [post]);

  return (
    <>
      <div className='postModal'>
        <div className="postModal__box">
          <div className="postModal__box--header">
            <h3>{post ? 'Edit' : 'Create'} Post</h3>
            {!alert.loading && <AiOutlineClose onClick={handleCloseModal} />}
          </div>
          <div className="postModal__box--content">
            <form onSubmit={handleSubmit}>
              <div>
                <textarea placeholder={alert.content ? alert.content : 'Write your caption here ...'} value={content} onChange={e => setContent(e.target.value)} style={{background: alert.content ? '#ffd1d1' : ''}} />
                <div className="postImage">
                  <h4>Image Upload</h4>
                  {alert.images && <small style={{color: 'red'}}>{alert.images}</small>}
                  <div className="postImage__icon">
                    {
                      stream
                      ? <AiFillCamera onClick={handleCapture} />
                      : (
                        <>
                          <AiFillCamera onClick={handleStartStream} />
                          <div className='fileInput'>
                            <input type="file" multiple accept='image/*,video/*' onChange={handleImageChange} />
                            <AiFillPicture />
                          </div>
                        </>
                      )
                    }
                  </div>
                  
                  {
                    stream
                    ? (
                      <div className='postImage__video'>
                        <video ref={videoRef} autoPlay muted width="100%" />
                        <AiOutlineClose onClick={handleStopStream} />
                        <canvas ref={canvasRef} style={{display: 'none'}} />
                      </div>
                    )
                    : (
                      <div className="postImage__container">
                        {
                          images.map((img, i) => (
                            <div key={i}>
                              {
                                img.camera
                                ? <img src={img.camera} alt='Post' />
                                : img.secure_url
                                  ? img.secure_url.match(/video/i) ? <video src={img.secure_url} controls /> : <img src={img.secure_url} alt='Post' />
                                  : img.type.match(/video/i)
                                    ? <video src={URL.createObjectURL(img)} controls />
                                    : (
                                      <img src={
                                        img.camera
                                        ? img.camera
                                        : URL.createObjectURL(img)
                                      } alt='Post' />
                                    )
                              }
                              <AiOutlineClose onClick={() => deleteImage(i)} />
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
              <button type='submit' disabled={alert.loading ? true : false}>{alert.loading ? 'Loading ...' : 'Submit'}</button>
              <div className="clear"></div>
            </form>
          </div>
        </div>
      </div>
      
      {
        !post && 
        <ConfirmAlert
          active={openConfirm}
          title='Discard Changes?'
          text='Once you confirm, all remaining content will be removed.' 
          onConfirm={() => {
            setStream(false);
            tracks && tracks.stop();
            setIsOpenModal(false);
          }}
          onCancel={() => {
            setOpenConfirm(false);
          }}
        />
      }
    </>
  )
}

export default PostModal;