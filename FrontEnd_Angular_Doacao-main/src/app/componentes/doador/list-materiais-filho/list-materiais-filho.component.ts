import { Observable } from 'rxjs';
import { FilhoMaterial } from './../../../model/filho-material';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/serviços/data.service';

@Component({
  selector: 'app-list-materiais-filho',
  templateUrl: './list-materiais-filho.component.html',
  styleUrls: ['./list-materiais-filho.component.css']
})
export class ListMateriaisFilhoComponent implements OnInit {
  materialFilho: FilhoMaterial = new FilhoMaterial();
  constructor(private router: Router, private dataService: DataService) { 
    // const navigation = this.router.getCurrentNavigation();
    // const states = navigation.extras.state as FilhoMaterial;
    //console.log(states);
  }
  
  ngOnInit(): void {
    //this.materialFilho = this.router.getCurrentNavigation().extras.state as FilhoMaterial;
    this.materialFilho = this.dataService.getFilho(); 
    console.log(this.materialFilho);
  }

}
