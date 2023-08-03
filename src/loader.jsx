import React from 'react';
import { Spin } from 'antd';

const Loader = () => {
    return (
        <div className="loader">
            <Spin
                tip="Loading"
                size="large"
            >
                <div className="content" />
            </Spin>
        </div>
    );
};

export default Loader;
