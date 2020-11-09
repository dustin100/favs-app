import React from 'react';

const Button = ({ fn, disabled, text }) => {
	return (
		<button className='btn' onClick={fn} disabled={disabled}>
			{text}
		</button>
	);
};

export default Button;
