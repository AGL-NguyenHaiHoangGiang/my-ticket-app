import { useState, useEffect, useRef } from "react";

const TypePicker = ({ setLocation, setFree }) => {
    const [location, setSelectedLocation] = useState('all');
    const [selectedIsFree, setSelectedIsFree] = useState(false);

    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    // Handle reset
    const handleReset = () => {
        setSelectedLocation('all');
        setSelectedIsFree(false);
    };

    // Handle apply
    const handleApply = () => {
        setShowPicker(false);
    };

    // Update parent state
    useEffect(() => {
        updateParentState();
    }, [location, selectedIsFree]);

    const updateParentState = () => {
        setLocation(location);
        setFree(selectedIsFree);
    };

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);

    return (
        <>
            {selectedIsFree || location !== 'all' ? (
                <div className="filter__tags">
                    {selectedIsFree && <div className="type-picker__selected">Miễn phí<span className="close" onClick={() => setSelectedIsFree(false)}></span></div>}
                    {location !== 'all' && <div className="type-picker__selected">{location}<span className="close" onClick={() => setSelectedLocation('all')}></span></div>}
                </div>
            ) : null}
            <div className="relative" ref={pickerRef}>
                <button onClick={() => setShowPicker(!showPicker)} className={`button-filter ${showPicker ? " is-active" : ""}`} id="typePickerBtn">Bộ lọc</button>

                {showPicker && (
                    <div id="typePicker">
                        <div className="type-picker">
                            <div className="type-picker__part">
                                <div className="type-picker__title">Vị trí</div>
                                <div className="type-picker__list">
                                    <div className="type-picker__item">
                                        <input type="radio" name="all" value="all" checked={location === 'all'} onChange={() => setSelectedLocation('all')} />
                                        <label htmlFor="all" onClick={() => setSelectedLocation('all')}>Toàn quốc</label>
                                    </div>
                                    <div className="type-picker__item">
                                        <input type="radio" name="hanoi" value="Hà Nội" checked={location === 'Hà Nội'} onChange={() => setSelectedLocation('Hà Nội')} />
                                        <label htmlFor="Hà Nội" onClick={() => setSelectedLocation('Hà Nội')}>Hà Nội</label>
                                    </div>
                                    <div className="type-picker__item">
                                        <input type="radio" name="hcm" value="Tp.Hồ Chí Minh" checked={location === 'Hồ Chí Minh'} onChange={() => setSelectedLocation('Hồ Chí Minh')} />
                                        <label htmlFor="Hồ Chí Minh" onClick={() => setSelectedLocation('Hồ Chí Minh')}>Tp.Hồ Chí Minh</label>
                                    </div>
                                    <div className="type-picker__item">
                                        <input type="radio" name="dalat" value="Đà Lạt" checked={location === 'Đà Lạt'} onChange={() => setSelectedLocation('Đà Lạt')} />
                                        <label htmlFor="Đà Lạt" onClick={() => setSelectedLocation('Đà Lạt')}>Đà Lạt</label>
                                    </div>
                                    <div className="type-picker__item">
                                        <input type="radio" name="other" value="Khác" checked={location === 'Khác'} onChange={() => setSelectedLocation('Khác')} />
                                        <label htmlFor="Khác" onClick={() => setSelectedLocation('Khác')}>Khác</label>
                                    </div>
                                </div>
                            </div>
                            <div className="type-picker__part">
                                <div className="type-picker__title">Giá tiền</div>
                                <div className="type-picker__row">
                                    <p className="type-picker__txt">Miễn phí</p>
                                    <button className={`btn-toggle ${selectedIsFree ? " is-active" : ""}`} onClick={() => setSelectedIsFree(!selectedIsFree)}>&nbsp;</button>
                                </div>
                            </div>
                            {/* <div className="type-picker__part">
                                <div className="type-picker__title">Thể loại</div>
                                <ul className="list-cat js-type-categories">
                                    <li className="js-type-cat" data-cat="Nhạc sống">Nhạc sống</li>
                                    <li className="js-type-cat" data-cat="Sân khấu & Nghệ thuật">Sân khấu & Nghệ thuật</li>
                                    <li className="js-type-cat" data-cat="Thể thao">Thể thao</li>
                                    <li className="js-type-cat" data-cat="Khác">Khác</li>
                                </ul>
                            </div> */}
                            <div className="type-picker__btns">
                                <button id="resetTypeBtn" onClick={handleReset}>Xóa Thiết Lập</button>
                                <button id="applyTypeBtn" onClick={handleApply}>Áp Dụng</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TypePicker;
