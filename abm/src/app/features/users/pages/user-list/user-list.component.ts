import { UserFormComponent } from './../../components/user-form/user-form.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.models';
import { UserService } from '../../services/user.services';
import { CommonModule, NgForOf,NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
   imports: [CommonModule, UserFormComponent,NgxPaginationModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {



public users: User[] = [];
selectedUser: User | null = null;
isModalOpen = false;

  page: number = 1; // 👈 Agregado: controla la página actual
searchText: string = '';
itemsPerPage: number = 5;
constructor(private userService: UserService) {}

ngOnInit() {
  this.loadUsers();
}
loadUsers(){
  console.log("asdasdasd")
  if( this.userService.getAll()) this.users= this.userService.getAll() || this.users;

}

onCreate(){

  this.selectedUser = null;
  this.isModalOpen = true;

}

onEdit(user: User) {
  this.selectedUser = user;
  this.isModalOpen = true;
}
onDelete(id: number) {
  this.userService.delete(id);
  this.loadUsers();
}
onSave(userData: Omit<User, 'id'>) {
  if (this.selectedUser) {
    this.userService.update(this.selectedUser.id, userData);
  } else {
    this.userService.create(userData);
  }
    this.loadUsers();
    this.isModalOpen = false;
    this.selectedUser = null;
}


// Método para filtrar productos según el buscador
get filteredUsers(): User[] {
  if (!this.searchText) return this.users;
  return this.users.filter(u =>
    u.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

}
