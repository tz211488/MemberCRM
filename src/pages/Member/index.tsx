import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { MemberListItem } from './data.d';
import { connect, Dispatch } from 'umi';

interface MemberListProps {
  dispatch:Dispatch;
  pageInfo: any;
  memberInfo: any;
  memberList: any;
}

const MemberList: React.FC<MemberListItem> = (props)=>{
   const {pageInfo, memberInfo, memberList} = props;

   const columns:ProColumns<MemberListItem>[] = [
     {
      title: '会员ID',
      dataIndex: 'uid',
     },
     {
      title: '名字',
      dataIndex: 'name',
     },
     {
      title: '状态',
      dataIndex: 'status',
     },
     {
      title: '年龄',
      dataIndex: 'age',
     },
     {
      title: '创建时间',
      dataIndex: 'createTime',
     },
     {
      title: '课程',
      dataIndex: 'class',
     },
     
     

   ]

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
       
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => console.log('aa'),
        }}
      />

    </PageContainer>
    )

}


export default connect(({member}:any)=>({
  pageInfo: member.pageInfo,
  memberInfo: member.byId,
  memberList: member.allIds
}))(MemberList)