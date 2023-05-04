import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit, AfterViewInit {

  id;
  displayedColumns: string[] = ['field', 'type', 'proprieta'];
  data;
  data_filtered = [];
  dataSource;
  field;
  type;
  mandatory;
  isDataLoaded = false;
  form_header;
  form_immagine;
  form_legenda;
  gateway_field;
  gateway_condition;


  constructor(private apiService: ApiService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.id = params['id'];
        this.apiService.getForm(this.id).subscribe((data: any) => {

          this.data = data[0];

          this.form_header = this.data['header'];
          this.form_immagine = this.data['immagine'];
          this.form_legenda = this.data['legenda'];

          //gateway

          if (this.data['gateway'] == 1) {
            this.gateway_field = this.data['gateway_info']['gateway_field'];

            switch (this.data['gateway_info']['gateway_condizione']) {
              case 'truefalse':
                this.gateway_condition = 'Vero / Falso';
                break;
              case 'lower':
                this.gateway_condition = 'Maggiore o Minore di ' + this.data['gateway_info']['gateway_valore'];
                break;
                case 'higher':
                  this.gateway_condition = 'Maggiore o Minore di ' + this.data['gateway_info']['gateway_valore'];
                  break;
              case 'equal':
                //caso di campo gateway di tipo select
                // ci saranno n condizioni, ognuna corrispondente al rispettivo valore del menu a tendina
                this.gateway_condition = 'Uguale a' ;
                break;
              case 'equal-noteqaul':
                this.gateway_condition = 'Uguale o Diverso da ' + this.data['gateway_info']['gateway_valore'];
                break;
            }


          }

          for (let i = 0; i < 10; i++) {
            let j = i + 1;
            if (this.data['campo' + j] != '') {
              this.data_filtered[i] = {
                id: j,
                field: this.data['campo' + j],
                type: this.data['tipocampo' + j],
                mandatory: this.data['obbligatorio' + j],

                options: this.data['tipocampo' + j] == 'Select' ? this.data['field' + j + '_select_valori'] : ''
              }
            }
          }
          this.dataSource = new MatTableDataSource(this.data_filtered);
          this.isDataLoaded = true;
        }, error => console.error(error));
      });

  }

  ngAfterViewInit(): void {

  }



}
