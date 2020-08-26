import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { MemberListItem } from './data.d';

const MemberList: React.FC<{}> = ()=>{

    const actionRef = useRef<ActionType>();

    return (
    <PageContainer>
        <ProTable<MemberListItem>
        headerTitle="会员总表"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={() => [
          <Button type="primary">
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />

    </PageContainer>
    )

}


export default MemberList