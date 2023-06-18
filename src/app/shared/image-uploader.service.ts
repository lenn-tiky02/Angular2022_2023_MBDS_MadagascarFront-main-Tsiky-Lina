import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {  

  //uri_api = 'http://localhost:8010';
  uri_api = 'https://backend-api-tsiky-lina.onrender.com';

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
