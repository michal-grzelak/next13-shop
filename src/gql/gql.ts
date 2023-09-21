/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment Pagination on Pagination {\n  page\n  pageCount\n  total\n  pageSize\n}": types.PaginationFragmentDoc,
    "fragment Product on ProductEntity {\n  id\n  attributes {\n    name\n    description\n    weightedRating\n    price\n    images {\n      data {\n        attributes {\n          alternativeText\n          url\n        }\n      }\n    }\n    categories {\n      data {\n        attributes {\n          name\n        }\n      }\n    }\n  }\n}": types.ProductFragmentDoc,
    "query ProductsGetList($pagination: PaginationArg) {\n  products(pagination: $pagination) {\n    data {\n      ...Product\n    }\n    meta {\n      pagination {\n        ...Pagination\n      }\n    }\n  }\n}": types.ProductsGetListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Pagination on Pagination {\n  page\n  pageCount\n  total\n  pageSize\n}"): typeof import('./graphql').PaginationFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Product on ProductEntity {\n  id\n  attributes {\n    name\n    description\n    weightedRating\n    price\n    images {\n      data {\n        attributes {\n          alternativeText\n          url\n        }\n      }\n    }\n    categories {\n      data {\n        attributes {\n          name\n        }\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($pagination: PaginationArg) {\n  products(pagination: $pagination) {\n    data {\n      ...Product\n    }\n    meta {\n      pagination {\n        ...Pagination\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
