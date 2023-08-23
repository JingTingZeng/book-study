import { Injectable } from "@angular/core";
import { DataSourceImplement } from "./dataSource";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from "rxjs";
import { Order, OrderLine, Product } from "./entities";


const baseUrl = 'http://localhost:4600';

const apiUrls = {
  products: `${baseUrl}/products`,
  orders: `${baseUrl}/orders`
}

@Injectable()
export class RemoteDataSource extends DataSourceImplement {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  loadProducts$(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(apiUrls.products);
  }

  storeOrder$(order: Order): Observable<number> {
    let orderData = {
      lines: [...order.orderLines.values()].map(o => ({
        productId: o.product.id,
        productName: o.product.name,
        quantity: o.quantity
      }))
    }
    return this.httpClient.post<{ id: number }>(apiUrls.orders, orderData)
      .pipe<number>(
        map(val => val.id)
      )
  }
}