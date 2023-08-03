import React, { useState, useEffect } from 'react';
import Input from 'antd/es/input/Input';
import debounce from 'lodash/debounce';

const Searchbox = ({ onChange, value }) => {
    const [inputValue, setInputValue] = useState(value);

    const debouncedOnChange = debounce(onChange, 750);

    useEffect(() => {
        debouncedOnChange(inputValue);
        return () => debouncedOnChange.cancel();
    }, [inputValue]);

    return (
        <div className="searchbox">
            <Input
                autoFocus
                type="text"
                className="searchbox-input"
                placeholder="Type to search"
                onChange={(e) => {
                    const inputValue = e.target.value;
                    const sanitizedValue = inputValue.replaceAll('  ', ' ');
                    if (sanitizedValue.trim() !== '') {
                        setInputValue(sanitizedValue);
                    } else {
                        setInputValue('');
                    }
                }}
                value={inputValue}
            />
        </div>
    );
};

export default Searchbox;
