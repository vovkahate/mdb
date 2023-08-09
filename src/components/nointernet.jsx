import React from 'react';
import Alert from 'antd/es/alert/Alert';

const NoInternet = () => {
    return (
        <Alert
            className="alert-start"
            style={{ textAlign: 'left' }}
            message="Error"
            description="No internet connection"
            type="error"
            showIcon
        />
    );
};

export default NoInternet;
