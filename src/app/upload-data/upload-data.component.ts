import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import embed from "vega-embed";
import { DataService } from '../shared/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {

  formGroup: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  activate: boolean = false;

  str: string = "";

  sendToken() {
    
    this.dataService.sendTokenization().pipe(takeUntil(this.destroy$)).subscribe(
      (data: any) => {
        console.log(data)
        this.str = JSON.stringify(data)
      }
    );
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
