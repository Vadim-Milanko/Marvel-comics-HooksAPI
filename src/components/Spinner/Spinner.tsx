import React from 'react'
import AtlassianSpinner from '@atlaskit/spinner';

import { IProps } from './interfaces'
import './style.scss';

const Spinner: React.FC<IProps> = (props: IProps): JSX.Element => {
    const { isLoading } = props;

    return (
        <div className={`spinner-wrapper ${isLoading ? 'visible' : ''}`}>
            <AtlassianSpinner appearance="invert" size="xlarge" />
        </div>
    )
}

export default Spinner;