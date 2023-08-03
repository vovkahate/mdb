import React from 'react';
import Alert from 'antd/es/alert/Alert';

const NoInternet = () => {
    return (
        <Alert
            style={{ textAlign: 'left', margin: '35px' }}
            message="Error"
            description="No internet connection"
            type="error"
            showIcon
        />
    );
};

export default NoInternet;
