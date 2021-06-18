import React, { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { omit } from 'lodash';

import { IProps, ICharacter } from './interfaces';
import { queryNameStartsWith, queryOrderBy, queryOffset, queryPage, LIMIT, QUERY_ORDER_BY, STANDART_MEDIUM, ASC_ORDER, DESC_ORDER, ORDER_BY } from './constants';
import Header from '../../components/Header/Header';
import Character from './components/Character/Character';
import Spinner from '../../components/Spinner/Spinner';
import SearchBar from './components/SearchBar/SearchBar';
import Pagination from '@atlaskit/pagination';
import api from '../../api/Api';
import { getQueryParams } from '../../utils';

import './style.scss';

const SearchPage: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCharacters = async (): Promise<void> => {
        const { location } = props;

        const queryParams = getQueryParams(location.search);
        const name = queryParams.nameStartsWith as string;
        const pageFromUrl = queryParams[queryPage] || 1;

        const currentOffset = LIMIT * (pageFromUrl - 1);

        setIsLoading(true);

        try {
            const response = await api.fetchCharacters({ params: { ...omit(queryParams, [queryPage]), [queryOffset]: currentOffset } });
            setCharacters(response.results);
            setSearchQuery(name || '');
            setTotal(response.total);
            setIsLoading(false);

        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCharacters();
    }, []);

    useEffect(() => {
        window.addEventListener("popstate", fetchCharacters);

        return () => {
            window.removeEventListener("popstate", fetchCharacters);
        };
    }, []);

    const search = async (fetchParams: any, historyParams: any): Promise<void> => {
        const { history, location } = props;

        try {
            const response = await api.fetchCharacters(fetchParams);
            const queryStringURL = queryString.stringify(historyParams);

            history.push(`${location.pathname}?${queryStringURL}`);

            setCharacters(response.results);
            setTotal(response.total);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const searchCharacters = useCallback(async (): Promise<void> => {
        const { history, location } = props;
        const queryParams = getQueryParams(location.search);
        const name = queryParams.nameStartsWith as string;
        const newQueryParams = { ...queryParams, [queryNameStartsWith]: searchQuery };

        setIsLoading(true);

        try {
            const response = await api.fetchCharacters({ params: { ...omit(newQueryParams, [queryPage]), [queryOffset]: 0 } });
            const queryStringURL = queryString.stringify({ ...newQueryParams, [queryPage]: 1 });

            if (name !== searchQuery) {
                history.push(`${history.location.pathname}?${queryStringURL}`);
            } else {
                history.replace(`${history.location.pathname}?${queryStringURL}`);
            }

            setCharacters(response.results);
            setTotal(response.total);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }, [searchQuery]);

    const changeOrder = (): void => {
        const { location } = props;

        const queryParams = getQueryParams(location.search);
        const order = queryParams[queryOrderBy] || QUERY_ORDER_BY.ASC;
        const newOrder = order === QUERY_ORDER_BY.ASC ? DESC_ORDER : ASC_ORDER;
        const newQueryParams = { ...queryParams, [queryOrderBy]: newOrder.order };
        setIsLoading(true);
        search({ params: omit(newQueryParams, [queryPage]) }, newQueryParams)
    };

    const getTitleOrderBy = () => {
        const queryParams = getQueryParams(location.search);
        let titleOrderBy = queryParams[queryOrderBy] || ORDER_BY.ASC;

        if (typeof queryParams[queryOrderBy] !== 'undefined') {
            titleOrderBy = queryParams[queryOrderBy] === QUERY_ORDER_BY.DESC ? ORDER_BY.DESC : ORDER_BY.ASC;
        }

        return titleOrderBy;
    }

    const onChangePagination = (pageNumber: number): void => {
        const { location } = props;

        const offset = LIMIT * (pageNumber - 1);
        const queryParams = getQueryParams(location.search);
        const newQueryParams = { ...queryParams, [queryOffset]: offset };
        setIsLoading(true);
        search({ params: omit(newQueryParams, [queryPage]) }, omit({ ...newQueryParams, [queryPage]: pageNumber }, ['limit', 'apikey', 'offset']));
    };

    const getPagesPagination = (total: number): number[] => {
        const pageCount = Math.ceil(total / LIMIT);
        const pages = [];

        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        return pages;
    }

    const queryPageParams = getQueryParams(location.search);
    const currentPage = queryPageParams[queryPage] || 1;

    return (
        <div className='search-page-wrapper'>
            <Header />
            <SearchBar
                searchQuery={searchQuery}
                title={getTitleOrderBy()}
                onInputChange={onInputChange}
                changeOrder={changeOrder}
                searchHeroes={searchCharacters} />
            <h2 className='list-title'>List of Character</h2>
            <>
                {
                    characters.map(character => {
                        const { thumbnail } = character;
                        const { extension, path } = thumbnail;
                        const imgSize = STANDART_MEDIUM;
                        const imgUrl = `${path}/${imgSize}.${extension}`;

                        return (
                            <Character
                                key={character.id}
                                id={character.id}
                                name={character.name}
                                imgUrl={imgUrl} />
                        )
                    })
                }
            </>
            <div className='pagination'>
                <Pagination
                    max={10}
                    pages={getPagesPagination(total)}
                    selectedIndex={currentPage === 0 ? currentPage : currentPage - 1}
                    onChange={(event: React.SyntheticEvent<any, Event>, page: number) => {
                        onChangePagination(page);
                    }} />
            </div>
            <Spinner isLoading={isLoading} />
        </div>
    )
}

export default SearchPage