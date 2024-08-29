import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export interface Todo {
  'id' : bigint,
  'completed' : boolean,
  'description' : string,
}
export interface _SERVICE {
  'addTodo' : ActorMethod<[string], bigint>,
  'deleteTodo' : ActorMethod<[bigint], Result>,
  'getTodos' : ActorMethod<[], Array<Todo>>,
  'toggleTodo' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
