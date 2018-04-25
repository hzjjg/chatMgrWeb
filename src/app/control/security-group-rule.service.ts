
import {Injectable} from "@angular/core";
import {EntityService} from "../shared/entity.service";
import {HttpClient} from "@angular/common/http";
import {SecurityGroupRule} from "./security-group-rule";

@Injectable()
export class SecurityGroupRuleService extends EntityService<SecurityGroupRule> {

    constructor(
        httpClient: HttpClient
    ) {
        super("/security-group-rules", "ruleId", httpClient)
    }
 

}