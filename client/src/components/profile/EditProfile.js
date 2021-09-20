import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from './../../redux/actions/globalTypes';
import { editProfile } from './../../redux/actions/profileActions';
import Avatar from './../Avatar';

const checkErr = ({file, name, story}) => {
  let err = {};

  if (file) {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      err.avatar = 'The avatar should be jpeg or png format';
    } else if (file.size > 1024 * 1024 * 2) {
      err.avatar = 'The maximum avatar size is 2MB.';
    }
  }

  if (!name) {
    err.name = 'Name can\'t be empty';
  }

  if (story.length > 300) {
    err.story = 'Story length should not be more than 300 characters.';
  }

  return err;
}

const EditProfile = ({setIsEditProfile}) => {
  const [userData, setUserData] = useState({
    name: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
    gender: ''
  });
  const [avatar, setAvatar] = useState('');

  const dispatch = useDispatch();
  const {auth, alert} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    setAvatar(file);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const err = checkErr({file: avatar, name: userData.name, story: userData.story});
    if (Object.keys(err).length !== 0) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: err
      });
    } else {
      await dispatch(editProfile({userData, avatar, auth}));
      setIsEditProfile(false);
    }
  }

  useEffect(() => {
    if (!alert.loading) {
      setUserData({
        name: auth.user.name,
        mobile: auth.user.mobile,
        address: auth.user.address,
        website: auth.user.website,
        story: auth.user.story,
        gender: auth.user.gender
      })
    }
  }, [alert.loading, auth.user]);

  return (
    <div className='editProfile'>
      <div className="editProfile__box">
        <div className="editProfile__header">
          <h3>Edit Profile</h3>
          <AiOutlineClose onClick={() => setIsEditProfile(false)} />
        </div>
        <div className="editProfile__content">
          <form onSubmit={handleSubmit}>
            <div className="inputFile">
              <Avatar src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar} size='big' />
              <div>
                <input type="file" accept='image/*' onChange={handleChangeImage} />
                {alert.avatar && <small style={{color: 'red'}}>{alert.avatar}</small>}
              </div>
            </div>
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" autoComplete='off' value={userData.name} onChange={handleChange} style={{background: alert.name ? '#ffd1d1' : ''}} />
              {alert.name && <small style={{color: 'red'}}>{alert.name}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="mobile">Mobile</label>
              <input type="text" name="mobile" id="mobile" autoComplete='off' value={userData.mobile} onChange={handleChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="address">Address</label>
              <input type="text" name="address" id="address" autoComplete='off' value={userData.address} onChange={handleChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="website">Website</label>
              <input type="text" name="website" id="website" autoComplete='off' value={userData.website} onChange={handleChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="story">Story</label>
              <div className='inputGroup--lengthInfo'>
                <textarea name="story" id="story" autoComplete='off' value={userData.story} onChange={handleChange} />
                <small>{`${userData.story.length} / 300`}</small>
              </div>
              {alert.story && <small style={{color: 'red'}}>{alert.story}</small>}
            </div>
            <div className="inputGroup">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" value={userData.gender} onChange={handleChange}>
                <option value="">Do not specify</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button type="submit" disabled={alert.loading ? true : false}>{alert.loading ? 'Loading ...' : 'Save Changes'}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;