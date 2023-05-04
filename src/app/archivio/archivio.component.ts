import { Component, Injectable, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { ApiService } from '../api.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { faSortAlphaUp, faSortAlphaDown,faLongArrowAltUp,faLongArrowAltDown,faCalendarDay} from '@fortawesome/free-solid-svg-icons';


/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: string, public level: number = 1, public expandable: boolean = false, public is_proc: string, public nome: string, public is_accessible: number) { }
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable()
export class DynamicDatabase {
  globalData = [];
  dataMap = new Map();
  rootLevelNodes;
  isproc;
  fname;
  radius = 200;
  ripple_disabled = false;

  constructor(public apiService: ApiService) {
  }

  /** Initial data from database */
  initialData(id, dati): DynamicFlatNode[] {
    this.globalData = dati;
    this.rootLevelNodes = [id];
    for (let i = 0; i < dati.length; i++) {
      let thischildren = [];
      if (dati[i].children != null) {
        for (let j = 0; j < dati[i].children.length; j++) {
          thischildren.push(dati[i].children[j].id);
        }
      }
      this.dataMap.set(dati[i].id, thischildren);
    }
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, this.isExpandable(name), this.isProcedure(name), this.folderName(name), 1));
  }


  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    //return this.dataMap.has(node);
    return this.globalData.find(x => x.id == node).children != undefined;
  }

  isProcedure(node: string): string {
    return this.globalData.find(x => x.id == node).is_proc;
  }

  folderName(node: string): string {
    return this.globalData.find(x => x.id == node).name;
  }

  folderAccessibility(node: string): number {
    return this.globalData.find(x => x.id == node).is_accessible;
  }

}
/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource {

  dataChange: BehaviorSubject<DynamicFlatNode[]> = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DynamicDatabase) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed!.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach((node) => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */

  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this.database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }


    if (expand) {
      const nodes = children.map(name =>
        new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name), this.database.isProcedure(name), this.database.folderName(name), this.database.folderAccessibility(name)));
      this.data.splice(index + 1, 0, ...nodes);
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++, count++) { }
      this.data.splice(index + 1, count);
    }

    // notify the change
    this.dataChange.next(this.data);

  }
}

/**
 * @title Tree with dynamic data
 */
@Component({
  selector: 'app-archivio',
  templateUrl: './archivio.component.html',
  styleUrls: ['./archivio.component.css'],
  providers: [DynamicDatabase]
})
export class ArchivioComponent {

  id_user: any;
  data_liv0: any;
  fGroup;
  findDocDescr;
  findDocCod;
  findCatDescr;
  
  expand_content_proc = [];
  expand_info_doc = [];
  order_alpha_content=[];
  order_date_content=[];
  //ogni elemento di content_proc deve a sua volta essere un array
  content_proc = [];
  innerWidth;
  mode;
  open;
  loading = false;
  faSortAlphaUp = faSortAlphaUp;
  faSortAlphaDown = faSortAlphaDown;
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;
  faCalendar = faCalendarDay;

  search_menu_state = false;

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
  }

  constructor(private observer: BreakpointObserver, public database: DynamicDatabase, private apiService: ApiService, private router: Router) {

    //responsive sidenav
    this.innerWidth = window.innerWidth;
    this.mode = this.innerWidth > 800 ? 'side' : 'over';
    this.open = this.innerWidth > 800 ? true : false;
    this.id_user = JSON.parse(localStorage.getItem('ID'));

    //input di ricerca
    this.fGroup = new FormGroup({
      findDocDescr: new FormControl(),
      findDocCod: new FormControl(),
      findCatDescr: new FormControl()
    });

    //inizializzazione
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.apiService.GetFascicoloLiv0(this.id_user).subscribe((dati: any) => {
      this.data_liv0 = dati;
    });

  }

  //alimentazione dataSource - contenuto della radice selezionata nella sidenav
  //input: id_padre = fascicolo radice
  //toggle = true: menu laterale da chiudere (nel caso in cui provengo dal click sul menu laterale), false (menu laterale già chiuso, non deve essere aperto - nel caso provenga dalla selezione del path a partire dalla ricerca documento)
  expand_content(id_padre, toggle): void {
    this.expand_content_proc = [];
    this.expand_info_doc = [];
    this.content_proc = [];
    this.order_alpha_content=[];
    this.order_date_content = [];
    this.dataSource.data = [];
    if (this.innerWidth < 800 && toggle) this.sidenav.toggle();
    this.apiService.getFascicoloContenuto(id_padre, this.id_user).subscribe((dati: any) => {
      this.dataSource.data = this.database.initialData(id_padre, dati);
    });
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => { return node.level; };

  isExpandable = (node: DynamicFlatNode) => { return node.expandable; };

  hasChild = (_: number, _nodeData: DynamicFlatNode) => { return _nodeData.expandable; };

  search_menu_control(): void {
    this.search_menu_state = !this.search_menu_state;
  }

  cerca_cat(descrizione, toggle): void {
    //to do - reset campi doc
    this.expand_content_proc = [];
    this.expand_info_doc = [];
    this.content_proc = [];
    this.order_alpha_content=[];
    this.order_date_content = [];
    this.dataSource.data = [];
    if (this.innerWidth < 800 && toggle) this.sidenav.toggle();
    this.apiService.getFascicoloFromSearch(descrizione, this.id_user).subscribe((dati: any) => {
      this.dataSource.data = this.database.initialData('radice', dati);
      this.buildPath(dati, true);
    });

  }

  cerca_doc(descrizione, indice) {
    //to do - reset campi categoria

    //reset sidenav-content
    this.expand_content_proc = [];
    this.expand_info_doc = [];
    this.content_proc = [];
    this.order_alpha_content=[];
    this.order_date_content = [];
    this.content_proc = [];
    this.dataSource.data = [];
    //loading
    this.loading = true;
    //cerco il documento a partire dalla descrizione
    this.apiService.getDocumentoFromDescr(descrizione, indice, this.id_user).subscribe((dati: any) => {
      //il servizio restituisce tutti i documenti corrispondenti ai criteri di ricera
      let temp_array = [];
      if (dati != null) {
        for (let i = 0; i < dati.length; i++) {
          if (temp_array.find(x => x.item == dati[i].id_fascicolo) == undefined) {
            let obj = new Object();
            obj['children'] = [];
            obj['item'] = dati[i].id_fascicolo;
            obj['nome'] = dati[i].nome_fascicolo;
            obj['is_proc'] = dati[i].is_proc;
            obj['is_accessibile'] = dati[i].is_accessibile;
            obj['giorno'] = dati[i].giorno;
            obj['is_result'] = 1;
            obj['descrizione'] = dati[i].descrizione;
            temp_array.push(obj);
          }
        }
        //inizializzazione
        this.dataSource.data = temp_array;

        //distribuzione dei risultati di ricerca tra i fascicoli contenitori
        for (let i = 0; i < dati.length; i++) {
          let doc_array = new Array;
          doc_array.push(dati[i]);
          if (this.content_proc[dati[i].id_fascicolo] == undefined) {
            this.content_proc[dati[i].id_fascicolo] = doc_array;
          } else {
            this.content_proc[dati[i].id_fascicolo].push(dati[i]);
          }
          this.expand_content_proc[dati[i].id_fascicolo] = true;
          this.order_alpha_content[dati[i].id_fascicolo]='asc';
          this.order_date_content[dati[i].id_fascicolo]= 'asc';
        }
        //costruzione del path
        this.buildPath(dati, false);

      }
      this.loading = false;

    });
  }

  contentProcedura(id_fascicolo) {
    if (this.expand_content_proc[id_fascicolo] == undefined) {
      this.expand_content_proc[id_fascicolo] = true;
      this.order_alpha_content[id_fascicolo]='asc';
      this.order_date_content[id_fascicolo]= 'asc';
    } else {
      this.expand_content_proc[id_fascicolo] = !this.expand_content_proc[id_fascicolo];
    }

    if (this.expand_content_proc[id_fascicolo]) {
      this.loading = true;
      this.apiService.getDocumentiProcedura(id_fascicolo, this.id_user, 'order by d.descrizione asc').subscribe((dati: any) => {
        this.loading = false;
        if (dati != null) {
          this.content_proc[id_fascicolo] = dati;
        }else{
          this.content_proc[id_fascicolo] = [];
        }
      });
    } else {
      this.removeContent(id_fascicolo);
    }
  }

  goToDoc(id_procedura, id_workflow, descrizione) {
    this.vaiAlDocumento(id_procedura, id_workflow, descrizione)
  }

  sortAlphaDocs(id_fascicolo) {
    if (this.order_alpha_content[id_fascicolo] == 'asc') {
      this.order_alpha_content[id_fascicolo]='desc';
      this.content_proc[id_fascicolo] = this.content_proc[id_fascicolo].sort((a, b) => b.descrizione.localeCompare(a.descrizione));
    } else {
      this.order_alpha_content[id_fascicolo]='asc';
      this.content_proc[id_fascicolo] = this.content_proc[id_fascicolo].sort((a, b) => a.descrizione.localeCompare(b.descrizione));
      }
  }

  sortDateDocs(id_fascicolo) {
    if (this.order_date_content[id_fascicolo] == 'asc') {
      this.order_date_content[id_fascicolo]='desc';
      this.content_proc[id_fascicolo] = this.content_proc[id_fascicolo].sort((a, b) => b.giorno.localeCompare(a.giorno));
    } else {
      this.order_date_content[id_fascicolo]='asc';
      this.content_proc[id_fascicolo] = this.content_proc[id_fascicolo].sort((a, b) => a.giorno.localeCompare(b.giorno));
      }
  }


  buildPath(content, toggle) {
    let view = this;
    
    if (toggle) this.dataSource.toggleNode(this.dataSource.data[0], toggle);
    for (let i = 0; i < content.length; i++) {
      if (content[i].percorso_array != null && content[i].percorso_array != undefined) {
        let path = content[i].percorso_array;
        let path_html = '';

        for (let j = 0; j < path.length; j++) {
          if (path[j]['id'] != 0) {
            let html_dir = "<a id='path" + path[j]['id'] + "' class='single_path' > " + path[j]['nome'] + " </a>";
            path_html = html_dir + "\/" + path_html;
          }
        }

        var pathSelection = document.getElementsByClassName('path');
        $('#percorso' + content[i].id_fascicolo).html(path_html);
      }
    }
    for (let l = 0; l < pathSelection.length; l++) {
      pathSelection[l].addEventListener("click", function (e) {
        if (toggle) view.dataSource.toggleNode(view.dataSource.data[0], false);
        view.expand_content(e.target['id'].split('path')[1], false);
      })
    }
  }


  removeContent(id_fascicolo) {
    this.content_proc[id_fascicolo] = [];
  }

  vaiAllaProcedura(id_procedura) {
    this.apiService.getProceduraFascicolo(id_procedura, '', this.id_user).subscribe((dati: any) => {
      if(dati.id_gruppo==''){
        alert('Utente non abilitato alla procedura');
      }else{
        let navigationExtras: NavigationExtras = {
        queryParams: { 'procedura': id_procedura, 'gruppo': dati.id_gruppo }
        };
        this.router.navigate(['/workflowprocedura'], navigationExtras);
      }
    });
  }

  vaiAlDocumento(procedura, workflow, descrizione) {
    this.apiService.getProceduraFascicolo(procedura, workflow, this.id_user).subscribe((dati: any) => {
      
      if(dati.id_gruppo=='' || dati.privilegi==''){
        if(dati.id_gruppo==''){
          alert('Utente non abilitato alla procedura');
        }
        else{
          alert('Per il gruppo '+dati.id_gruppo+' non sono ancora stati definiti i privilegi di accesso ala procedura');
        }      
      }else{
        let navigationExtras: NavigationExtras = {
          queryParams: {
            'id_procedura': procedura, 'gruppo': dati.id_gruppo,
            'p': dati.privilegi, 'id_workflow': workflow, 'descrizione': descrizione
          }
        };
       this.router.navigate(['/documentiview'], navigationExtras);
      }
    });
  }

  downloadFile(path): void {
    this.apiService.downloadDocumento(path).subscribe(data => {
      let blob = new Blob([data], { type: data.type });
      var fileURL = URL.createObjectURL(blob);
      window.open(fileURL);
    });
  }

  showInfo(id_documento){
    if (this.expand_info_doc[id_documento] == undefined) {
      this.expand_info_doc[id_documento] = true;
    } else {
      this.expand_info_doc[id_documento] = !this.expand_info_doc[id_documento];
    }
  }
}
