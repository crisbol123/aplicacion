import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-luces',
  standalone: true,
  imports: [],
  templateUrl: './luces.component.html',
  styleUrl: './luces.component.css'
})
export class LucesComponent implements OnInit {
  
  constructor(private http: HttpClient) {}


ngOnInit(): void {
  
  this.http.get<any[]>('http://localhost:8081/luces/actualizarEstado?id=4').subscribe(data => {
    console.log(data); // 
  }
)
}
}

