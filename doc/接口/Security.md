- 


GET /security-gags
POST /security-gags
GET /security-gags/{gagId}
PUT /security-gags/{gagId}
DELETE /security-gags/{gagId}


SecurityGag {
    gagId: ID
    userId: number 需设置
    userType: IMUserType  OUTPUT  用户类型
    relationId: number  OUTPUT
    username: string  OUTPUT
    reason: string 
    expireTime: number
    createTime: number OUTPUT
}