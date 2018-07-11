import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    todoes: <T = Todo[]>(args: { where?: TodoWhereInput, orderBy?: TodoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    todo: <T = Todo | null>(args: { where: TodoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    todoesConnection: <T = TodoConnection>(args: { where?: TodoWhereInput, orderBy?: TodoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createTodo: <T = Todo>(args: { data: TodoCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTodo: <T = Todo | null>(args: { data: TodoUpdateInput, where: TodoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTodo: <T = Todo | null>(args: { where: TodoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTodo: <T = Todo>(args: { where: TodoWhereUniqueInput, create: TodoCreateInput, update: TodoUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTodoes: <T = BatchPayload>(args: { data: TodoUpdateInput, where?: TodoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTodoes: <T = BatchPayload>(args: { where?: TodoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    todo: <T = TodoSubscriptionPayload | null>(args: { where?: TodoSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Todo: (where?: TodoWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateTodo {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createTodo(data: TodoCreateInput!): Todo!
  updateTodo(data: TodoUpdateInput!, where: TodoWhereUniqueInput!): Todo
  deleteTodo(where: TodoWhereUniqueInput!): Todo
  upsertTodo(where: TodoWhereUniqueInput!, create: TodoCreateInput!, update: TodoUpdateInput!): Todo!
  updateManyTodoes(data: TodoUpdateInput!, where: TodoWhereInput): BatchPayload!
  deleteManyTodoes(where: TodoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  todoes(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Todo]!
  todo(where: TodoWhereUniqueInput!): Todo
  todoesConnection(where: TodoWhereInput, orderBy: TodoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TodoConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  todo(where: TodoSubscriptionWhereInput): TodoSubscriptionPayload
}

type Todo implements Node {
  id: ID!
  text: String!
}

"""A connection to a list of items."""
type TodoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TodoEdge]!
  aggregate: AggregateTodo!
}

input TodoCreateInput {
  text: String!
}

"""An edge in a connection."""
type TodoEdge {
  """The item at the end of the edge."""
  node: Todo!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TodoOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TodoPreviousValues {
  id: ID!
  text: String!
}

type TodoSubscriptionPayload {
  mutation: MutationType!
  node: Todo
  updatedFields: [String!]
  previousValues: TodoPreviousValues
}

input TodoSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TodoSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TodoSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TodoSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TodoWhereInput
}

input TodoUpdateInput {
  text: String
}

input TodoWhereInput {
  """Logical AND on all given filters."""
  AND: [TodoWhereInput!]

  """Logical OR on all given filters."""
  OR: [TodoWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TodoWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
}

input TodoWhereUniqueInput {
  id: ID
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type TodoOrderByInput =   'id_ASC' |
  'id_DESC' |
  'text_ASC' |
  'text_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface TodoCreateInput {
  text: String
}

export interface TodoWhereUniqueInput {
  id?: ID_Input
}

export interface TodoUpdateInput {
  text?: String
}

export interface TodoSubscriptionWhereInput {
  AND?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput
  OR?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput
  NOT?: TodoSubscriptionWhereInput[] | TodoSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TodoWhereInput
}

export interface TodoWhereInput {
  AND?: TodoWhereInput[] | TodoWhereInput
  OR?: TodoWhereInput[] | TodoWhereInput
  NOT?: TodoWhereInput[] | TodoWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface TodoPreviousValues {
  id: ID_Output
  text: String
}

export interface BatchPayload {
  count: Long
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface TodoSubscriptionPayload {
  mutation: MutationType
  node?: Todo
  updatedFields?: String[]
  previousValues?: TodoPreviousValues
}

export interface Todo extends Node {
  id: ID_Output
  text: String
}

/*
 * A connection to a list of items.

 */
export interface TodoConnection {
  pageInfo: PageInfo
  edges: TodoEdge[]
  aggregate: AggregateTodo
}

export interface AggregateTodo {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface TodoEdge {
  node: Todo
  cursor: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string