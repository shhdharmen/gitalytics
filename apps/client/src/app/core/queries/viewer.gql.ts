import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({ providedIn: 'root' })
export class ViewerGQL extends Query {
  document = gql`
    query {
      viewer {
        login
      }
    }
  `;
}
