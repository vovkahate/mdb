import React from 'react';
import { Pagination } from 'antd';
const Pagi = ({ total, handlePage, current }) => {
    return (
        <Pagination
            style={{ marginTop: '36px', marginBottom: '17px' }}
            defaultCurrent={current}
            total={total}
            showSizeChanger={false}
            pageSize={20}
            onChange={(value) => handlePage(value)}
        />
    );
};
export default Pagi;
