import { useState, useRef } from 'react';
import { AiOutlineClose, AiFillCamera, AiFillPicture } from 'react-icons/ai';
import ConfirmAlert from './../ConfirmAlert';

const PostModal = ({setIsOpenModal}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const videoRef = useRef();
  const canvasRef = useRef();

  const handleCloseModal = () => {
    if (content || images.length > 0) {
      setOpenConfirm(true);
    } else {
      setStream(false);
      tracks && tracks.stop();
      setIsOpenModal(false);
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

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <>
      <div className='postModal'>
        <div className="postModal__box">
          <div className="postModal__box--header">
            <h3>Create Post</h3>
            <AiOutlineClose onClick={handleCloseModal} />
          </div>
          <div className="postModal__box--content">
            <form onSubmit={handleSubmit}>
              <div>
                <textarea placeholder='Your caption here ...' value={content} onChange={e => setContent(e.target.value)} />
                <div className="postImage">
                  <h4>Image Upload</h4>
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
              <button type='submit'>Submit</button>
              <div className="clear"></div>
            </form>
          </div>
        </div>
      </div>
      {
        openConfirm && (
          <ConfirmAlert
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
        )
      }
    </>
  )
}

export default PostModal;