import React from 'react';
import Alert from 'antd/es/alert/Alert';

const Error = ({ error }) => {
    return (
        <Alert
            style={{ textAlign: 'left', margin: '35px' }}
            message="Error"
            description={error}
            type="error"
            showIcon
        />
    );
};

export default Error;
