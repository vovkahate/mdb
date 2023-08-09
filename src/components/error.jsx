import React from 'react';
import Alert from 'antd/es/alert/Alert';

const Error = ({ error }) => {
    return (
        <Alert
            className="alert-start"
            message="Error"
            description={error}
            type="error"
            showIcon
        />
    );
};

export default Error;
