import React  from 'react';
import './ImageLinkForm.css';
const ImageLinkForm =()=> {

		return (

			<div>
			<p className='f3'>
				{'This magic Brain will detect faces in your pictures.Give it a try!'}
			</p>
			<div className=' center'>
			<div className='form center shadow-5 br3 pa4'>
			<input className='f4 w-70 center pa2' type='text'/>	
			<button className='w-30 grow pointer link f4 ph3 pv2 dib bg-light-purple white'>Detect</button>
			</div>
			</div>
			</div>

			);

}
export default ImageLinkForm;