import axios from 'axios';

import { ICharacter } from '../pages/SearchPage/interfaces';
import { IComics } from '../pages/ComicsPage/iterfaces'
import { BASE_URL, CHARACTERS, LIMIT, API_KEY, queryOffset } from '../pages/SearchPage/constants';
import { COMICS_BASE_URL, COMICS } from '../pages/ComicsPage/constants';

const CHARACTERS_URL = `${BASE_URL}/${CHARACTERS}`;

interface IFetchCharacterResponse {
    limit: number;
    offset: number;
    results: ICharacter[];
    total: number;
}

interface IFetchComicsResponse {
    results: IComics[];
}

interface IApi {
    fetchCharacters(requestParams?: any): Promise<IFetchCharacterResponse>;
    fetchComics(characterId: string, requestParams?: any): Promise<IFetchComicsResponse>;
}

class Api implements IApi {

    async fetchCharacters(requestObject: any): Promise<IFetchCharacterResponse> {
        let response;

        if (typeof requestObject.params[queryOffset] === 'undefined') {
            requestObject.params[queryOffset] = 0;
        }

        try {
            response = await axios.get(CHARACTERS_URL, { ...requestObject, params: { ...requestObject.params, limit: LIMIT, apikey: API_KEY } });
        } catch (error) {
            console.log(error);
        }

        return response?.data?.data;
    }

    async fetchComics(characterId: string): Promise<IFetchComicsResponse> {
        let response;

        const COMICS_URL = `${COMICS_BASE_URL}/${characterId}/${COMICS}`;
        try {
            if (!characterId) {

                throw new Error('API Error: Character id wrong!');
            } else {
                response = await axios.get(COMICS_URL, { params: { apikey: API_KEY } });
            }

        } catch (error) {
            console.log(error);
        }

        return response?.data?.data;
    }
}

const api = new Api();

export default api;