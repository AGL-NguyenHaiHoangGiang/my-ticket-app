import { Link } from 'react-router-dom';

export default function FooterNav({ nav }) {
    return (
        <ul className="footer__nav">
            {nav.map((item, index) => (
                <li key={index}>
                    <Link to={item.link}>{item.title}</Link>
                </li>
            ))}
        </ul>
    );
}