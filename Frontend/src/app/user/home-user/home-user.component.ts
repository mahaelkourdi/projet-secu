import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/message/message.service';
import { Data } from '../../data';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';




@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {

  displayedColumns: string[] = ['name','email','signup_date'];
  users: any;
  dataSource = new MatTableDataSource<Data>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private message:MessageService, private tokenStorage : TokenStorageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.message.getAllUsers(this.tokenStorage.getUser().userId).subscribe({
      next: (value) => {
        this.users = value.data;
        console.log(value)
        this.dataSource.data = value['data'];
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
