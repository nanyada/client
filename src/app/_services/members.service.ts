import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Member } from '../_modules/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl
  members: Member[] = []
  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members)
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(users => {
        this.members = users
        return users
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(user => user.userName === username)
    if (member) return of(member)
    const endpoint = this.baseUrl + 'users/username/' + username
    return this.http.get<Member>(endpoint)
  }

  updateProfile(member: Member) {
    const endpoint = `${this.baseUrl}users`
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member)
        this.members[index] = { ...this.members[index], ...member }
      })
    )
  }
}
