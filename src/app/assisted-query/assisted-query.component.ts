import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assisted-query',
  templateUrl: './assisted-query.component.html',
  styleUrls: ['./assisted-query.component.css']
})
export class AssistedQueryComponent implements OnInit {
  values = ""
  ifErupt = false

  input_val = "";
  graph_1 = "";
  graph_2 = "";
  graph_3 = "";

  onKey(event: any) {
    this.input_val = event.target.value;
    if (this.input_val.includes("eruption")) {
      this.graph_1 =
        "https://graph-demo.azurewebsites.net/graph_query?query=eruption";
      this.graph_2 = "";
      this.graph_3 = "";
    } else if (this.input_val.includes("caries")) {
      this.graph_2 =
        "https://graph-demo.azurewebsites.net/graph_query?query=caries";
      this.graph_1 = "";
      this.graph_3 = "";
    } else if (this.input_val.includes("oral")) {
      this.graph_3 =
        "https://graph-demo.azurewebsites.net/graph_query?query=oral";
      this.graph_1 = "";
      this.graph_2 = "";
    } else {
      this.graph_1 = "";
      this.graph_2 = "";
      this.graph_3 = "";
    }
  }

  

  constructor() { }

  ngOnInit(): void {
  }

}
