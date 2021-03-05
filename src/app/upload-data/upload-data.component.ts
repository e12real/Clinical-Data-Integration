import { Component, OnInit } from '@angular/core';
import { Tag } from "../tag";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-upload-data',
  templateUrl: './upload-data.component.html',
  styleUrls: ['./upload-data.component.css']
})
export class UploadDataComponent implements OnInit {
  selectedFile: File = null;
  public tags: Tag[];
  imageURL: string;

  constructor(private http: HttpClient) {}

  onFileChanged(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append("image", this.selectedFile, this.selectedFile.name);

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);

    this.tags.push({ name: "Angular", backgroundColor: "#868E96", color: "#FFFFFF" });

    console.log(this.tags)

    this.http
      .post("http://127.0.0.1:5000/classify", uploadData)
      .subscribe(data => {
        console.log(data); // handle event here
        for (var i = 0; i < data.length; i++) {
          let classification = {} as Tag;
          classification.name = data[i];
          classification.backgroundColor = "#0275d8";
          classification.color = "#FFFFFF";
          this.tags.push(classification);
        }
      });
  }

  tags: Tag[] = [
    /**
    { name: "Angular", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "React", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Vue", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Preact", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Svelte", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Skate", backgroundColor: "#868E96", color: "#FFFFFF" }
    */
  ];
  suggestions: Tag[] = [
    { name: "Ember", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Aurelia", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "AngularJS", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "Mithril", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "jQuery", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "knockout", backgroundColor: "#868E96", color: "#FFFFFF" },
    { name: "inferno", backgroundColor: "#868E96", color: "#FFFFFF" }
  ];

  onTagRemoved(tag: Tag) {
    const index = this.tags.findIndex(
      t => t.name.toLowerCase() === tag.name.toLowerCase()
    );
    if (index !== -1) {
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
    }
  }

  onTagAdded(tag: Tag) {
    const index = this.tags.findIndex(
      t => t.name.toLowerCase() === tag.name.toLowerCase()
    );
    if (index === -1) {
      this.tags = [...this.tags, tag];
    }
  }

}
