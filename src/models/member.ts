import { Effect, Reducer, Subscription } from 'umi';
import { getMemberList } from '../services/member';
import dotProp from 'dot-prop-immutable';

interface MemberModelType{
    namespace: 'member';
    state: DefaultSettings;
    effects:{

        [effect:string]: Effect;
    };
    reducers:{
        [reducer:string]: Reducer<DefaultSettings>;
    };
    subscriptions:{
        init?: Subscription;
    }
}

interface Member {

    // 查看 page页里相同配置，修改需要相应一起
    uid:number;
    name:string;
    status: '结束'|'服务中'|'意向';
    age: number;
    createTime: Date;
    class: any[];
}

interface DefaultSettings {
    members:{
        byId: {
            [uid:number]:Member;
        };
        allIds: number[]
    };
    pageInfo:{
        pageSize: number;
        currentPage: number;
        totalPage: number;
    }
    
}

const defaultSate:DefaultSettings = {
    members:{
        byId:{},
        allIds:[]
    },
    pageInfo:{
        pageSize:20,
    currentPage:1,
    totalPage:100,
    }
}


const normalize = (taskList: any) => {
    const tempObject: {
      byId: any;
      allIds: string[];
    } = {
      byId: {},
      allIds: [],
    };
    taskList.forEach((item: any) => {
      tempObject.byId[item.uid] = item;
      tempObject.allIds.push(item.uid);
    });
  
    return tempObject;
  };

const member: MemberModelType = {
    namespace:'member',
    state: defaultSate,
    effects:{
        *setUpAsync({payload},{call, select, put}){
            const { pageSize, currentPage } = yield select(({member}:any)=>{
                console.log(member)
                return {
                    pageSize: member.pageSize,
                    currentPage: member.currentPage
                }
            })
            const res = yield call(getMemberList,{pageSize, currentPage});
            const { success, data } = res;
            const { rows:memberList, totalPage} = data;
            if (!success) return;
            yield put({
                type:'setUp',
                payload:{
                    memberList,
                    pageInfo:{
                        pageSize, totalPage, currentPage
                    }
                }
            })
        }
    },
    reducers:{
        setUp(state,{payload}){
            const memberList = normalize(payload.memberList);
            const updateState = dotProp.set(state, `members`, memberList);
            const updateStatePage = dotProp.set(updateState, `pageInfo`, payload.pageInfo);
            return updateStatePage
        }
    },
    subscriptions:{
        init({dispatch}){
            dispatch({
                type:'setUpAsync'
            })
        }
    }
}



export default member