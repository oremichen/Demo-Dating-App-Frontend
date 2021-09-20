export interface Pagenation{
    currentPage?: number;
    itemsPerPage?: number;
    totalItems?: number;
    totalPages?: number;
}

export class PagenatedResult<T>{
    result: T;
    pagenation: Pagenation;
}