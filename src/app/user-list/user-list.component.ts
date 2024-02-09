import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[] = [];
  public selectedUser: User;
  public mode: string;
  public id: number;
  public firstname: string;
  public lastname: string;
  public email: string;
  public emailExist: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.initDataTable();
  }

  initDataTable() {
      this.userService.findAll().subscribe(data => {
          this.users = data;
      });
  }

  initModale() {
      this.id = 0;
      this.firstname = '';
      this.lastname =  '';
      this.email = '';
  }

  setMode(mode: string) {
    this.mode = mode;
  }
  setSelectedUser(user: User) {
    this.selectedUser = user;
    this.id = this.selectedUser.id;
    this.firstname = this.selectedUser.firstName;
    this.lastname = this.selectedUser.lastName;
    this.email = this.selectedUser.email;
  }

  deleteUser() {
    this.userService.deleteUser(this.selectedUser.id).subscribe(usr => {
        this.initDataTable();
    });
  }

  saveuser() {
    let user : User = {
      id: this.id,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email
    }
    if (this.mode === 'CREATION') {
      this.userService.save(user).subscribe(usr => {
          this.initDataTable();
      });
    } else {
      this.userService.update(user).subscribe(usr => {
          this.initDataTable();
      });
    }
  }

  checkIfEmailAlreadyExist() {
      return this.mode === 'CREATION' && this.emailExist;
  }

  checkEmailUser(email: string) {
      if (email.includes('@')) {
          this.userService.checkEmailUser(email).subscribe(res => {
              this.emailExist = res;
          });
      }
  }

  search(term: any) {
    if (!term.value) {
      this.initDataTable();
    } else {
       this.users.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.value.trim().toLowerCase())
        || x.lastName.trim().toLowerCase().includes(term.value.trim().toLowerCase())
      );
    }
  }
}
