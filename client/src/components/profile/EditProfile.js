import { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Avatar from './../Avatar';

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
  const {auth, alert} = useSelector(state => state);

  const handleChange = e => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value});
  }

  const handleChangeImage = e => {
    const file = e.target.files[0];
    setAvatar(file);
  }

  const handleSubmit = e => {
    e.preventDefault();
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
              </div>
            </div>
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" autoComplete='off' value={userData.name} onChange={handleChange} />
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
              <textarea name="story" id="story" autoComplete='off' value={userData.story} onChange={handleChange} />
            </div>
            <div className="inputGroup">
              <label htmlFor="gender">Gender</label>
              <select name="gender" id="gender" value={userData.gender}>
                <option value="">Do not specify</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfile;