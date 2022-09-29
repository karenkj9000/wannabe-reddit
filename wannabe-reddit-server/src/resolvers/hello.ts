import { Resolver, Query } from "type-graphql";
import "reflect-metadata";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  hello() {
    return "bye";
  }
}
