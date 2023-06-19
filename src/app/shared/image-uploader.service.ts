import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {  

  uri_api = environment.base_url;

	constructor(
		private http: HttpClient
	) { }

	upload(file: File) {
		const formData: FormData = new FormData();
		formData.append('image', file);
		const req = new HttpRequest('POST', `${this.uri_api}/api/file-upload`, formData, {
			reportProgress: true,
			responseType: 'json'
		});
		return this.http.request(req);
	}
}
