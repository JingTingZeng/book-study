import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { DataSource, DataSourceImplement } from "./dataSource";
import { RemoteDataSource } from "./remoteDataSource";


@NgModule({
  imports: [HttpClientModule],
  providers: [
    DataSource,
    { provide: DataSourceImplement, useClass: RemoteDataSource },
  ]
})

export class DataModelModule { }