export interface MemberListItem {

    uid:string;
    name:string;
    status: '结束'|'服务中'|'意向';
    age: number;
    createTime: Date;
    class: any[];
}