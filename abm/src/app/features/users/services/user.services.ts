import { StorageService } from '../../../core/services/storage.service';
import { User } from '../../../shared/models/user.models';
import { Container } from './../../../../../node_modules/lightningcss/node/ast.d';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly storageKey = 'users';
  constructor(private storage: StorageService) {

  }
  getAll(): User[] {
    return this.storage.getItem<User>(this.storageKey) || [];
  }
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const users = this.getAll();
    const newUser: User = { id: Date.now(), createdAt: new Date(), updatedAt: new Date(), ...user };
    users.push(newUser);
    this.storage.setItem(this.storageKey, users);
    return newUser;
  }
  update(id: number, data: Partial<User>): User | null {
    const users = this.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    const updatedUser = { ...users[index], ...data, updatedAt: new Date() };
    users[index] = updatedUser;
    this.storage.setItem(this.storageKey, users);
    return updatedUser;
  }

  delete(id: number): void {
    const users = this.getAll().filter(u => u.id !== id);
    this.storage.setItem(this.storageKey, users);
  }
}
