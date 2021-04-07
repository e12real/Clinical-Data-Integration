import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import embed from "vega-embed";
import { DataService } from '../shared/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-assisted-query',
  templateUrl: './assisted-query.component.html',
  styleUrls: ['./assisted-query.component.css']
})
export class AssistedQueryComponent implements OnInit {
  
  formGroup: FormGroup;
  formGroup2: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  activate: boolean = false;
  visualization : boolean = false;
  images: string[] = [];

  queries: string[] = [];
  latestQuery: string;

  getimageurl: string = "http://sdp2.cse.uconn.edu:5054/file/";
  httpClient: any;
  response_table: string[] = [];
  vis_activate : boolean = false;
  sql_statement: string = "";

  createChart() {
    this.dataService.getGraphData().pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        console.log(data)
      }
    );
  }

  findImages(formData: { [x: string]: any }) {
    
    this.dataService.getNLImageQuery(formData["query"]).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        this.images = [];
        console.log(data)
        for(var i = 0; i < data.length; i++) {
          this.images.push(data[i])
        }
      }
    );
  }

  update(formData: { [x: string]: any }) {
    this.queries.push(formData["query"]);
    this.latestQuery = formData["query"];
  }

  onSubmit(formData: { [x: string]: any }) {
    this.http
      .get("http://localhost:5000/graph", {
        params: {
          query: formData["query"]
        }
      })
      .subscribe(data => {
        let spec = data[0];
        console.log(spec);
        embed("#vis", spec, { actions: false });
      });
  }
  onSubmitAssisted(formData: { [x: string]: any }){
    this.dataService.sendAssisted(formData["query"]).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        console.log(data['Data'])
        if (data['Data'] == 'NONE'){
          this.response_table[0] = "NONE";
        }
        else{
        this.response_table = data['Data'];
        this.sql_statement = data['SQL'];
        for (let i = 0; i < this.response_table.length; i++){
          var str : string = this.response_table[i];
          this.response_table[i] = (str).toString().replace(/,/g, " ")
        }
      }
      }
    );
  }
  onSubmitAnalysis(formData2: { [x: string]: any }){
    //"http://sdp2.cse.uconn.edu:5000/graph\?query\=show%20me%20a%20chart%20of%20different%20drugs\&sql\=SELECT%20\*%20FROM%20clinical_notes\;";
    let url = "http://sdp2.cse.uconn.edu:5000/graph\?query\=QUERY\&sql\=SQL\;";
    let url2 = url.replace(/QUERY/g, formData2.query2.trim().replace(/ /g, "%20"));
    let url3 = url2.replace(/SQL/g, this.sql_statement.trim().replace(/ /g, "%20").replace(/;/g, ""));
    
    console.log(url3);
    this.http
      .get(url3)
      .subscribe(data => {
        let spec = data[0];
        console.log(spec);
        embed("#vis", spec, { actions: false });
      });
  }
  
  

  update2(query: string) {
    this.queries.push(query);
    this.latestQuery = query;
  }

  findImages2(query: string) {
    
    this.dataService.getNLImageQuery(query).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        this.images = [];
        console.log(data)
        for(var i = 0; i < data.length; i++) {
          this.images.push(data[i])
        }
      }
    );
  }

  onSubmit2(query: string) {
    this.http
      .get("http://localhost:5000/graph", {
        params: {
          query
        }
      })
      .subscribe(data => {
        let spec = data[0];
        console.log(spec);
        embed("#vis", spec, { actions: false });
      });
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private dataService: DataService, private renderer: Renderer2) {
    this.formGroup = this.formBuilder.group({
      query: ""
      });
    this.formGroup2 = this.formBuilder.group({
      query2: new FormControl("")
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}





// values = ""
//   ifErupt = false

//   input_val = "";
//   graph_1 = "";
//   graph_2 = "";
//   graph_3 = "";

//   onKey(event: any) {
//     this.input_val = event.target.value;
//     if (this.input_val.includes("eruption")) {
//       this.graph_1 =
//         "https://graph-demo.azurewebsites.net/graph_query?query=eruption";
//       this.graph_2 = "";
//       this.graph_3 = "";
//     } else if (this.input_val.includes("caries")) {
//       this.graph_2 =
//         "https://graph-demo.azurewebsites.net/graph_query?query=caries";
//       this.graph_1 = "";
//       this.graph_3 = "";
//     } else if (this.input_val.includes("oral")) {
//       this.graph_3 =
//         "https://graph-demo.azurewebsites.net/graph_query?query=oral";
//       this.graph_1 = "";
//       this.graph_2 = "";
//     } else {
//       this.graph_1 = "";
//       this.graph_2 = "";
//       this.graph_3 = "";
//     }
//   }