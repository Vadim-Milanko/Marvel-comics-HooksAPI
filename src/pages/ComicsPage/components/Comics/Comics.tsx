import React from 'react'

import { IProps } from './interfaces';

import './style.scss';

const Comics: React.FC<IProps> = (props: IProps): JSX.Element => {
    const { title, description, imgUrl } = props;

    return (
        <div className='comics-wrapper'>
            <div className='comics-logo'>
                <img src={imgUrl} alt="comics-logo" className='comics-img' />
            </div>
            <div className='comics-information'>
                <p className='comics-title'>{title}</p>
                <p className='comics-description'>{description}</p>
            </div>
        </div>
    )
}

export default Comics