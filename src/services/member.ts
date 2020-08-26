import { request } from 'umi';

export interface MemeberListParam {
  pageSize: number;
  currentPage: number;
}

export async function getMemberList(params: MemeberListParam) {
  return request('/api/member/list', {
    method: 'POST',
    data: params,
  });
}
