import React from 'react';

import { IProps } from './interfaces';

import './style.scss'

const SearchBar: React.FC<IProps> = (props: IProps): JSX.Element => {
    const { searchQuery, title, onInputChange, changeOrder, searchHeroes } = props;

    return (
        <div className='searchBar-wrapper'>
            <input type="text" value={searchQuery} onChange={onInputChange} className='input' />
            <button type='button' onClick={changeOrder} className='button'>{title}</button>
            <button type='button' onClick={searchHeroes} className='button'>Search</button>
        </div>
    )
}

export default SearchBar
