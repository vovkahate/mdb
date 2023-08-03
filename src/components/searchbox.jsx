import React from 'react';
import Input from 'antd/es/input/Input';

const Searchbox = ({ onChange, value }) => {
    return (
        <div className="searchbox">
            <Input
                autoFocus
                type="text"
                className="searchbox-input"
                placeholder="Type to search"
                onChange={(e) => onChange(e.target.value)}
                value={value}
            ></Input>
        </div>
    );
};

export default Searchbox;
