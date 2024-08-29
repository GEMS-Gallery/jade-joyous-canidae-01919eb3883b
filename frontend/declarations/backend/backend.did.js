export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Todo = IDL.Record({
    'id' : IDL.Nat,
    'completed' : IDL.Bool,
    'description' : IDL.Text,
  });
  return IDL.Service({
    'addTodo' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'deleteTodo' : IDL.Func([IDL.Nat], [Result], []),
    'getTodos' : IDL.Func([], [IDL.Vec(Todo)], ['query']),
    'toggleTodo' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
