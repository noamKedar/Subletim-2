import {Injectable} from "@angular/core";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root',
})
export class SubletService{
  // @ts-ignore
  constructor(private http:Http) {
    console.log('Sublet Service Initialized...');
  }

  getSublets() {
    return this.http.get('subletRoute/sublets')
      .map(res => res.json());
  }

  addSublet(newTask) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('subletRoute/sublet', JSON.stringify(newTask), {headers: headers})
      .map(res => res.json());
  }

  deleteSublet(id) {
    return this.http.delete('subletRoute/sublet/'+id)
      .map(res => res.json());
  }

  updateSublet(sublet) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('subletRoute/sublet/'+sublet._id, JSON.stringify(sublet), {headers: headers})
      .map(res => res.json());
  }
}
