class GetAllPageableResponse {
    constructor(content, pageable) {
        this.content = content || [];
        this.first = pageable.first;
        this.last = pageable.last;
        this.totalPages = pageable.totalPages;
        this.totalElements = pageable.totalElements;
        this.numberOfElements = pageable.numberOfElements;
        this.pageSize = pageable.pageSize;
        this.pageNumber = pageable.pageNumber;
    }
}

export default GetAllPageableResponse;