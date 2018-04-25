import {EntityService} from "../shared/entity.service";
import {SecurityWordRule} from "./security-word-rule";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class SecurityWordRuleService extends EntityService<SecurityWordRule>{

    constructor(
        httpClient: HttpClient
    ) {
        super("/security-word-rules", "ruleId", httpClient)
    }

}