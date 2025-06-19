export default function Social({data}) {
    return (
        <ul className="social">
            {data.map(item => (
                <li>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <img src={item.icon} alt={item.alt} loading="lazy" />
                    </a>
                </li>
            ))}           
        </ul>
    )
}