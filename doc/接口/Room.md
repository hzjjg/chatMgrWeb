

- 机器人 RoomRobotInfo
GET    /room-robots?roomNo={roomNo}     返回 [RoomRobotInfo]
POST   /room-robots                     返回 扩展信息 如 {robotId: 1}  
PUT    /room-robots/{robotId｝          无返回
DELETE /room-robots/{robotId}           无返回

- 联系人 RoomContactInfo
GET    /room-contacts?roomNo={roomNO}   返回 [RoomContactInfo]
POST   /room-contacts                   返回 扩展信息 如 {contactId: 1}  
PUT    /room-contacts/{contactId}       无返回
DELETE /room-contacts/{contactId}       无返回

- 聊天记录 自己看前端的 Message
GET    /messages?roomNo={roomNo}
GET    /messages/{messageId}
DELETE /messages/{messageId}
DELETE  /messages?roomNo={roomNo}&lowerTime=秒数时间  删除之前的XXX之前的记录
   返回: {                                      
          deleteTotal: number
   }

    
- 计划 RoomPlan
GET     /room-plans?roomNo={roomNo}
POST    /room-plans
    返回: {
        planId: ..
        ....
    }

PUT    /room-plans/{planId}
    
DELETE  /room-plans/{planId}

//通知
GET /room-notice/proxy/qq-qrcode?roomNo
    返回{
        path: string,
        time: number
    }

GET /room-notice/proxy/qq?roomNo
    返回{
        account: string,
        nick: string
    }

DELETE delete /room-notice/proxy/qq?roomNo
    
 



------------------------------------------------------------------------
- RoomRobotInfo 
{
    robotId: string  (仅返回)
    roomNo:  string  (仅创建需要)
    userType: string 
    username: string
    nickname: string
    avatar: string
    personalSignature: string
    createTime: number 
}

- RoomContactInfo
{
    contactId: string (仅返回)
    roomNo: string    (仅创建需要)
    type: ContactType
    name: string
    url: string
    createTime: number
}

- RoomPlan
{
    planId: string
    roomNo: string
    
    code: string      计划代码
    template: string  模版
    
    newestTime: string    //输出使用 只能看
    lastPullTime: number  //输出使用 只能看
    createTime: number    //输出使用 只能看
}