import React, { useState } from 'react';
import { Pagination } from 'antd';
const Pagi = ({ total, handlePage, current }) => {
    console.log('total: ', total);

    return (
        <Pagination
            defaultCurrent={current}
            total={total}
            showSizeChanger={false}
            pageSize={20}
            onChange={(value) => handlePage(value)}
        />
    );
};
export default Pagi;
