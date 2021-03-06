import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
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
  destroy$: Subject<boolean> = new Subject<boolean>();

  activate: boolean = false;

  images: string[] = [];

  getimageurl: string = "http://sdpimageapi.azurewebsites.net/file/";

  createChart() {
    this.dataService.getGraphData().pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        console.log(data)
      }
    );
  }

  findImages(formData: { [x: string]: any }) {
    
    this.dataService.getNLImageQuery(formData).pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        this.images = [];
        console.log(data)
        for(var i = 0; i < data.length; i++) {
          this.images.push(data[i])
        }
      }
    );
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


  constructor(private http: HttpClient, private formBuilder: FormBuilder, private dataService: DataService) {
    this.formGroup = this.formBuilder.group({
      query: ""
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