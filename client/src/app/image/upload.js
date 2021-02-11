import React from 'react';
const UploadImage = ({onChange}) => {
  return(
    <div>
      <h5><i className="fas fa-upload"></i>{' Upload an image to begin.'}</h5>
      <br/>
      <input 
        type="file" 
        accept="image/*" 
        onChange={onChange}
      />
    </div>
  );
}
export default UploadImage;