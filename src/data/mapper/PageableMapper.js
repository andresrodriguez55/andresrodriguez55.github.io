import PageableDto from '../dto/PageableDto'

export const mapToPageableDto = (json, mapToConcreteDtoFunction) => {
    const mappedContent = json.content ? json.content.map(item => mapToConcreteDtoFunction(item)) : [];

    const pageable = {
        first: json.pageable.first || false,
        last: json.pageable.last || false,
        totalPages: json.pageable.totalPages || 0,
        totalElements: json.pageable.totalElements || 0,
        numberOfElements: json.pageable.numberOfElements || 0,
        pageSize: json.pageable.pageSize || 0,
        pageNumber: json.pageable.pageNumber || 0
    };

    return new PageableDto(mappedContent, pageable);
};