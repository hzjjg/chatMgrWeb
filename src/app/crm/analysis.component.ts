import { Component } from "@angular/core";
import {Chart} from "./chart";
import {PageDataSource} from "../shared/material-utils";
import {AnalysisService} from "./analysis.service";
import {Analysis} from "./analysis";

@Component({
    selector: 'analysis',
    templateUrl: 'analysis.component.html',
    providers: [AnalysisService]
})

export class AnalysisComponent {
    chartData: Chart[];
    chartType: string = 'line';
    chartLabels: Array<any>;
    chartColors: Array<any> = [
        {
            backgroundColor: 'transparent',
            borderColor: '#86c7f3',
            // pointBackgroundColor: '#ffe29a',
            // pointBorderColor: '#f5f5f5',
            // pointHoverBackgroundColor: 'lightBlue',
            // pointHoverBorderColor: 'rgba(103, 58, 183, .8)'
        },
        {
            backgroundColor: 'transparent',
            borderColor: '#ffa1b5',
            // pointBackgroundColor: '#93d9d9',
            // pointBorderColor: '#f5f5f5',
            // pointHoverBackgroundColor: '#fff',
            // pointHoverBorderColor: '#93d9d9'
        }
    ];

    constructor(
        private analysisService: AnalysisService
    ) {

    }

    public chartOptions: any = {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    ngOnInit() {
        this.analysisService.get().subscribe((data: Analysis[]) => {
            const visitors: Chart = {
                data: [],
                label: '新游客'
            };
            const customers: Chart = {
                data: [],
                label: '新客户'
            };
            const dates: any[] = [];

            (data|| []).forEach((item) => {
                visitors.data.push(item.newVisitors);
                customers.data.push(item.newCustomers);
                dates.push(item.date);
            });
            this.chartLabels = dates;
            this.chartData = [].concat(visitors, customers);
        });

        // let labels = this.analysis.date;
        // this.chartLabels = this.chartLabels;
    }
}