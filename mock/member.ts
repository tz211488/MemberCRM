import { Request, Response } from 'express';

const getMemberList =  (req: Request, res: Response) =>{

    res.json({
        data:{

            pageSize:20,
            totalNum:100,
            currentPage:1,
            rows:[
                {
                    
                }
            ]

        }
    })
    
}




export default {
    '/api/member': {
      '/list': getMemberList,
    },
  };
  