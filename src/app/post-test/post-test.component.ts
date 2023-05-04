import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-post-test',
  templateUrl: './post-test.component.html',
  styleUrls: ['./post-test.component.css']
})


export class PostTestComponent {



  constructor(private http: HttpClient) {
     
    
    var formData = new FormData();
    formData.append("apiKey", "2df14fedg74tfh5gh6thtrh87");
    formData.append("user", "a.morata");
    formData.append("pw", "Rubenthalas2!");
    this.http.post('http://172.29.10.206/app_service/GET_user.php', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
