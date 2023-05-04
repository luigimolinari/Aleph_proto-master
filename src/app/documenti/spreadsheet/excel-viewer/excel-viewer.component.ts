import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxSpreadsheetComponent } from 'igniteui-angular-spreadsheet';
import { ExcelUtility } from 'src/app/documenti/spreadsheet/excel-viewer/excel-utility';
import { ActiveCellChangedInfo, Workbook } from "igniteui-angular-excel";
import { WorkbookFormat } from "igniteui-angular-excel";
import { Worksheet } from "igniteui-angular-excel";
import { WorksheetTable } from "igniteui-angular-excel";
import { NamedReference } from "igniteui-angular-excel";
import { WorksheetCellComment } from "igniteui-angular-excel";
import { FormattedString } from "igniteui-angular-excel";
import { CellFill } from 'igniteui-angular-excel';
import {GetCellTextParameters } from 'igniteui-angular-excel';
import { WorkbookSaveOptions } from "igniteui-angular-excel";



@Component({
  selector: 'app-excel-viewer',
  templateUrl: './excel-viewer.component.html',
  styleUrls: ['./excel-viewer.component.css']
})
export class ExcelViewerComponent implements OnInit {
  @ViewChild("spreadsheet", { read: IgxSpreadsheetComponent })
  public spreadsheet: IgxSpreadsheetComponent;
  
  
  ngOnInit() {
  const excelFile = 'assets/Sample1.xlsx';

  var cartella=ExcelUtility.loadFromUrl(excelFile).then((w) => {
      var luigi=this.spreadsheet.workbook;
      this.spreadsheet.workbook = w;
      this.spreadsheet.workbook.worksheets().add("Foglio4");
      this.spreadsheet.workbook.worksheets("Foglio4").columns(1).cellFormat.fill = CellFill.createSolidFill("Blue");
      var cell = this.spreadsheet.workbook.worksheets("Foglio4").getCell("E2").cellFormat.fill = CellFill.createSolidFill("Red");
    
          });

        //  ExcelUtility.save(cartella, "fileName");
  // var worksheet = workbook.worksheets().add("Sheet2");
   
  // worksheet.columns(1).cellFormat.fill = CellFill.createSolidFill("Blue");
  // worksheet.columns(1).cellFormat.font.bold = true;

   //Accessing a single cell
  // var cell = worksheet.getCell("E2");
   //Accessing a range of cells
  // var region = worksheet.getRegion("G1:G10");
}

salva(){
  ExcelUtility.save(this.spreadsheet.workbook, "Aleph_download");
 }

/*
seleziona(cella){
  var cella= cella;
  this.spreadsheet.workbook.worksheets("Foglio4").getCell(cella).cellFormat.fill = CellFill.createSolidFill("Green");

  }
  */
}
