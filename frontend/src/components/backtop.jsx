import { useEffect, useState } from "react";
import iconBackTop from "../assets/images/common/icon-backtop.svg";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`backtop ${isVisible ? 'is-active' : ''}`} onClick={scrollToTop}>
            <img src={iconBackTop} alt="backtop" loading="lazy" />
        </div>
    );
}