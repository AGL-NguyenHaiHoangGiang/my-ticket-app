const Pagination = () => {
    return (
        <div className="pagination">
            <a href="#">&laquo;</a>
            <a href="#" className="active">1</a>
            <a href="#">2</a>
            <a href="#" className="sp-none">3</a>
            <span>...</span>
            <a href="#" className="sp-none">10</a>
            <a href="#">&raquo;</a>
        </div>
    );
};

export default Pagination;