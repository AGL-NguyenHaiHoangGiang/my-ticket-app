const Title = ({ tag: Tag = 'h2', className = '', text = '' }) => {
    return <Tag className={className}>{text}</Tag>;
};

export default Title;