import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'src/app/message/message.service';
import { Data } from '../../data';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  users: any = [];
  displayedColumns: string[] = ['name', 'email', 'signup_date', 'actions'];
  dataSource = new MatTableDataSource<Data>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private message: MessageService,
    private tokenStorage: TokenStorageService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.message.getAllUserAdmin(this.tokenStorage.getUser().userId).subscribe({
      next: (value) => {
        console.log(value);
        this.users = value.data;
        this.dataSource.data = value['data'];
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: any): void {
    this.message.deleteUserAdmin(id).subscribe({
      next: (value) => {},
    });
  }
}
