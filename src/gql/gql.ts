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
    "query CategoriesListGet {\n  categories {\n    ...Category\n  }\n}": types.CategoriesListGetDocument,
    "query CollectionListGet {\n  collections {\n    ...Collection\n  }\n}": types.CollectionListGetDocument,
    "fragment Category on Category {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}": types.CategoryFragmentDoc,
    "fragment Collection on Collection {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}": types.CollectionFragmentDoc,
    "fragment Product on Product {\n  id\n  name\n  description\n  price\n  images(first: 1) {\n    url\n  }\n  categories {\n    ...ProductCategory\n  }\n}": types.ProductFragmentDoc,
    "fragment ProductCategory on Category {\n  name\n  description\n}": types.ProductCategoryFragmentDoc,
    "fragment ProductPagination on ProductConnection {\n  aggregate {\n    count\n  }\n  pageInfo {\n    pageSize\n  }\n}": types.ProductPaginationFragmentDoc,
    "query ProductGet($productId: ID!) {\n  product(where: {id: $productId}) {\n    ...Product\n  }\n}": types.ProductGetDocument,
    "query ProductsListGet($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}": types.ProductsListGetDocument,
    "query ProductsListGetByCategoryId($first: Int!, $skip: Int!, $categoryId: ID!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {categories_some: {id: $categoryId}}\n  ) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}": types.ProductsListGetByCategoryIdDocument,
    "query ProductsListGetByCollectionId($first: Int!, $skip: Int!, $collectionId: ID!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {collections_some: {id: $collectionId}}\n  ) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}": types.ProductsListGetByCollectionIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesListGet {\n  categories {\n    ...Category\n  }\n}"): typeof import('./graphql').CategoriesListGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionListGet {\n  collections {\n    ...Collection\n  }\n}"): typeof import('./graphql').CollectionListGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Category on Category {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}"): typeof import('./graphql').CategoryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Collection on Collection {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}"): typeof import('./graphql').CollectionFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Product on Product {\n  id\n  name\n  description\n  price\n  images(first: 1) {\n    url\n  }\n  categories {\n    ...ProductCategory\n  }\n}"): typeof import('./graphql').ProductFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductCategory on Category {\n  name\n  description\n}"): typeof import('./graphql').ProductCategoryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductPagination on ProductConnection {\n  aggregate {\n    count\n  }\n  pageInfo {\n    pageSize\n  }\n}"): typeof import('./graphql').ProductPaginationFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGet($productId: ID!) {\n  product(where: {id: $productId}) {\n    ...Product\n  }\n}"): typeof import('./graphql').ProductGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGet($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGetByCategoryId($first: Int!, $skip: Int!, $categoryId: ID!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {categories_some: {id: $categoryId}}\n  ) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetByCategoryIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGetByCollectionId($first: Int!, $skip: Int!, $collectionId: ID!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {collections_some: {id: $collectionId}}\n  ) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetByCollectionIdDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
