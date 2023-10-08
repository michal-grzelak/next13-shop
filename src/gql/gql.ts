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
    "mutation CartAddProduct($cartId: ID!, $productId: ID!, $total: Int!, $quantity: Int!, $orderItemId: ID) {\n  upsertOrderItem(\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $cartId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $cartId}}}}\n    where: {id: $orderItemId}\n  ) {\n    ...CartOrderItem\n  }\n}": types.CartAddProductDocument,
    "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...CartOrder\n  }\n}": types.CartCreateDocument,
    "query CartGetById($cartId: ID!) {\n  order(where: {id: $cartId}, stage: DRAFT) {\n    ...CartOrder\n  }\n}": types.CartGetByIdDocument,
    "mutation CartRemoveProduct($orderItemId: ID) {\n  deleteOrderItem(where: {id: $orderItemId}) {\n    ...CartOrderItem\n  }\n}": types.CartRemoveProductDocument,
    "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(data: {quantity: $quantity}, where: {id: $itemId}) {\n    ...CartOrderItem\n  }\n}": types.CartSetProductQuantityDocument,
    "query CategoriesListGet {\n  categories {\n    ...Category\n  }\n}": types.CategoriesListGetDocument,
    "query CollectionListGet {\n  collections {\n    ...Collection\n  }\n}": types.CollectionListGetDocument,
    "fragment CartOrder on Order {\n  id\n  total\n  orderItems {\n    ...CartOrderItem\n  }\n}": types.CartOrderFragmentDoc,
    "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  total\n  product {\n    ...Product\n  }\n}": types.CartOrderItemFragmentDoc,
    "fragment Category on Category {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}": types.CategoryFragmentDoc,
    "fragment Collection on Collection {\n  id\n  name\n  slug\n  products(first: 1) {\n    name\n    images(first: 1) {\n      url\n    }\n  }\n}": types.CollectionFragmentDoc,
    "fragment Product on Product {\n  id\n  name\n  description\n  price\n  images(first: 1) {\n    url\n  }\n  categories {\n    ...ProductCategory\n  }\n}": types.ProductFragmentDoc,
    "fragment ProductCategory on Category {\n  name\n  description\n  slug\n}": types.ProductCategoryFragmentDoc,
    "fragment ProductDetails on Product {\n  ...Product\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n  }\n  reviews {\n    ...Review\n  }\n}": types.ProductDetailsFragmentDoc,
    "fragment ProductPagination on ProductConnection {\n  aggregate {\n    count\n  }\n  pageInfo {\n    pageSize\n  }\n}": types.ProductPaginationFragmentDoc,
    "fragment Review on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n}": types.ReviewFragmentDoc,
    "query ProductGet($productId: ID!) {\n  product(where: {id: $productId}, stage: DRAFT) {\n    ...ProductDetails\n  }\n}": types.ProductGetDocument,
    "query ProductsListGet($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}": types.ProductsListGetDocument,
    "query ProductsListGetByCategorySlug($first: Int!, $skip: Int!, $categorySlug: String!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...Product\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    ...ProductPagination\n  }\n}": types.ProductsListGetByCategorySlugDocument,
    "query ProductsListGetByCollectionSlug($first: Int!, $skip: Int!, $collectionSlug: String!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...Product\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    ...ProductPagination\n  }\n}": types.ProductsListGetByCollectionSlugDocument,
    "query ProductsListGetSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...Product\n  }\n}": types.ProductsListGetSearchDocument,
    "query ProductsListRelatedGet($categorySlug: String) {\n  products(first: 4, where: {categories_some: {slug: $categorySlug}}) {\n    ...Product\n  }\n}": types.ProductsListRelatedGetDocument,
    "mutation ReviewAdd($productId: ID!, $headline: String!, $content: String!, $rating: Int!, $name: String!, $email: String!) {\n  createReview(\n    data: {headline: $headline, content: $content, rating: $rating, name: $name, email: $email, product: {connect: {id: $productId}}}\n  ) {\n    ...Review\n  }\n}": types.ReviewAddDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartAddProduct($cartId: ID!, $productId: ID!, $total: Int!, $quantity: Int!, $orderItemId: ID) {\n  upsertOrderItem(\n    upsert: {create: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $cartId}}}, update: {quantity: $quantity, total: $total, product: {connect: {id: $productId}}, order: {connect: {id: $cartId}}}}\n    where: {id: $orderItemId}\n  ) {\n    ...CartOrderItem\n  }\n}"): typeof import('./graphql').CartAddProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartCreate {\n  createOrder(data: {total: 0}) {\n    ...CartOrder\n  }\n}"): typeof import('./graphql').CartCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CartGetById($cartId: ID!) {\n  order(where: {id: $cartId}, stage: DRAFT) {\n    ...CartOrder\n  }\n}"): typeof import('./graphql').CartGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartRemoveProduct($orderItemId: ID) {\n  deleteOrderItem(where: {id: $orderItemId}) {\n    ...CartOrderItem\n  }\n}"): typeof import('./graphql').CartRemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartSetProductQuantity($itemId: ID!, $quantity: Int!) {\n  updateOrderItem(data: {quantity: $quantity}, where: {id: $itemId}) {\n    ...CartOrderItem\n  }\n}"): typeof import('./graphql').CartSetProductQuantityDocument;
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
export function graphql(source: "fragment CartOrder on Order {\n  id\n  total\n  orderItems {\n    ...CartOrderItem\n  }\n}"): typeof import('./graphql').CartOrderFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CartOrderItem on OrderItem {\n  id\n  quantity\n  total\n  product {\n    ...Product\n  }\n}"): typeof import('./graphql').CartOrderItemFragmentDoc;
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
export function graphql(source: "fragment ProductCategory on Category {\n  name\n  description\n  slug\n}"): typeof import('./graphql').ProductCategoryFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductDetails on Product {\n  ...Product\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n  }\n  reviews {\n    ...Review\n  }\n}"): typeof import('./graphql').ProductDetailsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductPagination on ProductConnection {\n  aggregate {\n    count\n  }\n  pageInfo {\n    pageSize\n  }\n}"): typeof import('./graphql').ProductPaginationFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment Review on Review {\n  id\n  headline\n  content\n  rating\n  name\n  email\n}"): typeof import('./graphql').ReviewFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGet($productId: ID!) {\n  product(where: {id: $productId}, stage: DRAFT) {\n    ...ProductDetails\n  }\n}"): typeof import('./graphql').ProductGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGet($first: Int!, $skip: Int!) {\n  products(first: $first, skip: $skip) {\n    ...Product\n  }\n  productsConnection {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGetByCategorySlug($first: Int!, $skip: Int!, $categorySlug: String!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {categories_some: {slug: $categorySlug}}\n  ) {\n    ...Product\n  }\n  productsConnection(where: {categories_some: {slug: $categorySlug}}) {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGetByCollectionSlug($first: Int!, $skip: Int!, $collectionSlug: String!) {\n  products(\n    first: $first\n    skip: $skip\n    where: {collections_some: {slug: $collectionSlug}}\n  ) {\n    ...Product\n  }\n  productsConnection(where: {collections_some: {slug: $collectionSlug}}) {\n    ...ProductPagination\n  }\n}"): typeof import('./graphql').ProductsListGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListGetSearch($search: String!) {\n  products(where: {_search: $search}) {\n    ...Product\n  }\n}"): typeof import('./graphql').ProductsListGetSearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsListRelatedGet($categorySlug: String) {\n  products(first: 4, where: {categories_some: {slug: $categorySlug}}) {\n    ...Product\n  }\n}"): typeof import('./graphql').ProductsListRelatedGetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewAdd($productId: ID!, $headline: String!, $content: String!, $rating: Int!, $name: String!, $email: String!) {\n  createReview(\n    data: {headline: $headline, content: $content, rating: $rating, name: $name, email: $email, product: {connect: {id: $productId}}}\n  ) {\n    ...Review\n  }\n}"): typeof import('./graphql').ReviewAddDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
