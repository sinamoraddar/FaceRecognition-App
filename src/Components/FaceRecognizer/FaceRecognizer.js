import React from 'react';
import './FaceRecognizer.css';
const FaceRecognizer=({imageURL,box})=>{

return(
		<div id='image'>
	<img alt='faceRecognizer bounding-box' id='inputImage' src={imageURL}/>
	<div className='bounding-box' style={{top:box.top_row,bottom:box.bottom_row,left:box.left_col,right:box.right_col}}></div>
		</div>);


}
export default FaceRecognizer;