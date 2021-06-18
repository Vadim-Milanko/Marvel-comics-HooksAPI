import { RouteComponentProps } from 'react-router';
import { Location, Search } from 'history';

export interface IProps extends RouteComponentProps<Location<Search>> {
    comics: any;
}

export interface IThumbnail {
    extension: string;
    path: string
}

export interface ICharacter {
    id: number;
    name: string;
    thumbnail: IThumbnail;
}
export interface IOrder {
    order: string;
    title: string;
}

export interface IState {
    characters: ICharacter[];
    searchQuery: string;
    total: number;
    isLoading: boolean;
    ordering: IOrder;
    page: number;
}