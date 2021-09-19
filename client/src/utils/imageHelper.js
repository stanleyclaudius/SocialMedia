export const uploadImage = async(files, type) => {
  const images = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    type === 'avatar' ? formData.append('upload_preset', 'scmlcvko') : formData.append('upload_preset', 'esekoizw');
    formData.append('cloud_name', 'dpef9sjqt');

    const res = await fetch('https://api.cloudinary.com/v1_1/dpef9sjqt/image/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    images.push({
      public_id: data.public_id,
      secure_url: data.secure_url
    });
  }

  return images;
}