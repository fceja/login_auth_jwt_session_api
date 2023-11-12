import { WriteInterface } from "../interfaces/WriteInterface";
import { ReadInterface } from "../interfaces/ReadInterface";
import { Pool, QueryResult } from "pg";

export abstract class BaseRepository<T>
  implements WriteInterface<T>, ReadInterface<T>
{
  private readonly _pool: Pool;
  private readonly _tableName: string;

  constructor(pool: Pool, tableName: string) {
    this._pool = pool;
    this._tableName = tableName;
  }

  async create(item: T): Promise<boolean> {
    try {
      const columns = Object.keys(item).join(", ");
      const values = Object.values(item);

      const query = `INSERT INTO ${
        this._tableName
      } (${columns}) VALUES (${values
        .map((_, index) => `$${index + 1}`)
        .join(", ")}) RETURNING id`;

      console.log(`query -> ${query}`);
      //   const queryResult: QueryResult = await this._pool.query(
      //     `INSERT INTO ${this._tableName} (${columns}) VALUES (${values
      //       .map((_, index) => `$${index + 1}`)
      //       .join(", ")}) RETURNING id`
      //   );

      //   return !!queryResult.rows[0]?.id;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
    // throw new Error( "Method not implemented.");
  }

  update(id: string, item: T): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async find(item: T): Promise<T[]> {
    try {
      let query = `SELECT * FROM ${this._tableName}`;
      let conditions = ` WHERE`;

      const columns = Object.keys(item);
      const values = Object.values(item);

      let firstFilled = false;
      columns.forEach((column, index) => {
        if (values[index]) {
          const condition = !firstFilled ? "" : " AND";
          conditions += `${condition} ${this._tableName}.${column}='${values[index]}'`;

          firstFilled = true;
        }
      });

      query += conditions;

      const queryResult: QueryResult = await this._pool.query(query);

      return queryResult.rows;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  findOne(id: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
}
