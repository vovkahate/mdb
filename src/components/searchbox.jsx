import React from 'react';
import Input from 'antd/es/input/Input';
import { memo } from 'react';

const Searchbox = memo(({ onChange, value }) => {
    return (
        <div className="searchbox">
            <Input
                autoFocus
                type="text"
                className="searchbox-input"
                placeholder="Type to search"
                onChange={(e) => onChange(e)}
                value={value}
            ></Input>
        </div>
    );
});

export default Searchbox;
