import React from 'react';
import { Link } from 'react-router-dom';

import { IProps } from './interfaces';

import './style.scss';


const Character: React.FC<IProps> = (props: IProps): JSX.Element => {
    const { id, name, imgUrl } = props;

    return (
        <div className='character-wrapper'>
            <div>
                <img src={imgUrl} alt="character-logo" className='logo' />
            </div>
            <div className='character-title'>
                {name}
            </div>
            <Link to={`/comics/${id}`}>
                <button type='button' className='button'>See more</button>
            </Link>
        </div>
    )
}

export default Character