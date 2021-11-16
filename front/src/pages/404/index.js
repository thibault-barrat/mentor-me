/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import './style.scss';
import img404 from '/src/assets/images/404.png';

const errorPage = () => (
	<div className='a__container'>
		<div className='t__container'>
			<h1 className='t__title'>OOPS</h1>
			<p className='t__text'>
				On dirait que tu t'es perdu ... <br /> On a surement quelqu'un qui peut
				t'apprendre à te repérer !
			</p>
			<a href='/'>
				<button className='t__button' type='button'>
					{' '}
					retour{' '}
				</button>
			</a>
		</div>
		<div className='i__container'>
			<img src={img404} alt='Page 404' className='img404' />
		</div>
	</div>
);

export default errorPage;
