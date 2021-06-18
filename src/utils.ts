import queryString from 'query-string';

export const getQueryParams = (url: string): any => queryString.parse(url);