import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatorDecisionTree } from '../models/interfaces';

@Injectable({providedIn: "root"})
export class OperatorDecisionTreeDataService {
  constructor(private http: HttpClient) {}

  getDecisionTree$(): Observable<OperatorDecisionTree> {
    return this.http.get<OperatorDecisionTree>(
      '/decision-tree.json'
    );
  }
}