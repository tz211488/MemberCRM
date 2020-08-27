import { Request, Response } from 'express';
import mockjs from 'mockjs';
import { testURL } from 'jest.config';

const getMemberList = (req: Request, res: Response) => {
  res.json({
    status:201,
    success: true,
    data: mockjs.mock({
      pageSize: 20,
      totalPage: 100,
      currentPage: 1,
      'rows|20': [
        {
          'uid|+1': 1000,
          name: '@name',
          'status|1': ['结束', '服务站', '意向'],
          'age|25-30': 30,
          createTime: '@datetime',
          'class|1-3': ['@string'],
        },
      ],
    }),
  });
};

export default {
  'POST /api/member/list': getMemberList
};
