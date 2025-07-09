const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 1) {
                pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const handleClick = (page) => {
        if (page === '...') return; 
        if (page < 1 || page > totalPages) return; 
        onPageChange(page);
    };

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <a href="#" onClick={() => handleClick(currentPage - 1)}>&laquo;</a>
            )}
            {getPageNumbers().map((page, index) => (
                <a
                    key={index}
                    href="#"
                    className={page === currentPage ? "active" : ""}
                    onClick={() => handleClick(page)}
                >
                    {page}
                </a>
            ))}
            {currentPage < totalPages && (
                <a href="#" onClick={() => handleClick(currentPage + 1)}>&raquo;</a>
            )}
        </div>
    );
};

export default Pagination;