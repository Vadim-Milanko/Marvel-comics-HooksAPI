import React, { useState, useEffect } from 'react';

import Spinner from '../../components/Spinner/Spinner';
import { IComics, IProps } from './iterfaces';
import { API_KEY, STANDART_LARGE } from './constants';
import Comics from './components/Comics/Comics';
import api from '../../api/Api';

import './style.scss';

const ComicsPage: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [comicses, setComicses] = useState<IComics[]>([]);
    const [isLoading, setIsloading] = useState<boolean>(false);

    const fetchComicses= async(): Promise<void> => {
        const { match } = props;
        const { characterId } = match.params;
        setIsloading(true);

        try {
            const response = await api.fetchComics(characterId)
            setComicses(response.results);
            setIsloading(false);
        } catch (error) {
            setIsloading(false)
        }
    }

    useEffect(() => {
        fetchComicses();
    }, []);


    return (
        <div className='comics-page-wrapper'>
            <h2 className='page-title'>Hero comics</h2>
            <div>
                {
                    comicses.map(comics => {
                        const { thumbnail } = comics;
                        const { extension, path } = thumbnail;
                        const imgSize = STANDART_LARGE;
                        const imgUrl = `${path}/${imgSize}.${extension}`;

                        return (
                            <Comics
                                key={comics.id}
                                title={comics.title}
                                description={comics.description}
                                imgUrl={imgUrl} />
                        )
                    })
                }
            </div>

            <Spinner isLoading={isLoading} />
        </div>
    )
}

export default ComicsPage;

