export interface MemberListItem {
 // 查看 model 页里相同配置，修改需要相应一起
    uid:number;
    name:string;
    status: '结束'|'服务中'|'意向';
    age: number;
    createTime: Date;
    class: any[];
}