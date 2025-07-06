export default function Social({data}) {
    return (
        <ul className="social">
            {data.map((item,index) => (
                <li key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <img src={item.icon} alt={item.alt} loading="lazy" />
                    </a>
                </li>
            ))}           
        </ul>
    )
}