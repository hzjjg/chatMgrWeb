export class SecurityGroupRule {
    ruleId: number;

    //IP段 访问限制,逗号分隔开
    target: string;

    remark: string;

    //规则有效时间
    effectiveTime?: string;

    createTime: string;
}