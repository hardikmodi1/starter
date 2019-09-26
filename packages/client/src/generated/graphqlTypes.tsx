import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ChangePasswordInput = {
  password: Scalars['String'],
  token: Scalars['String'],
};

export type Channel = {
  __typename?: 'Channel',
  id: Scalars['ID'],
  name: Scalars['String'],
  public: Scalars['Boolean'],
};

export type CreateChannelInput = {
  name: Scalars['String'],
  isPublic: Scalars['Boolean'],
  teamId: Scalars['Float'],
};

export type CreateMessageInput = {
  text: Scalars['String'],
  channelId: Scalars['Float'],
};

export type Error = {
  __typename?: 'Error',
  path?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
};

export type Message = {
  __typename?: 'Message',
  id: Scalars['ID'],
  text: Scalars['String'],
};

export type Mutation = {
  __typename?: 'Mutation',
  createChannel: Error,
  createMessage: Scalars['Boolean'],
  createTeam?: Maybe<Error>,
  changePassword?: Maybe<User>,
  confirmUser: Scalars['Boolean'],
  forgotPassword: Scalars['Boolean'],
  login?: Maybe<Array<Error>>,
  logout: Scalars['Boolean'],
  register?: Maybe<Array<Error>>,
};


export type MutationCreateChannelArgs = {
  data: CreateChannelInput
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  usernameOrEmail: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};

export type PasswordInput = {
  password: Scalars['String'],
};

export type Query = {
  __typename?: 'Query',
  me?: Maybe<User>,
  hello: Scalars['String'],
};

export type RegisterInput = {
  password: Scalars['String'],
  email: Scalars['String'],
  username: Scalars['String'],
};

export type Team = {
  __typename?: 'Team',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  username: Scalars['String'],
};
export type CreateTeamMutationMutationVariables = {
  name: Scalars['String']
};


export type CreateTeamMutationMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: Maybe<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )> }
);

export type LoginMutationMutationVariables = {
  usernameOrEmail: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutationMutation = (
  { __typename?: 'Mutation' }
  & { login: Maybe<Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )>> }
);

export type RegisterMutationMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type RegisterMutationMutation = (
  { __typename?: 'Mutation' }
  & { register: Maybe<Array<(
    { __typename?: 'Error' }
    & Pick<Error, 'path' | 'message'>
  )>> }
);

export const CreateTeamMutationDocument = gql`
    mutation CreateTeamMutation($name: String!) {
  createTeam(name: $name) {
    path
    message
  }
}
    `;
export type CreateTeamMutationMutationFn = ApolloReactCommon.MutationFunction<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>;
export type CreateTeamMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>, 'mutation'>;

    export const CreateTeamMutationComponent = (props: CreateTeamMutationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateTeamMutationMutation, CreateTeamMutationMutationVariables> mutation={CreateTeamMutationDocument} {...props} />
    );
    
export type CreateTeamMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateTeamMutationMutation, CreateTeamMutationMutationVariables> & TChildProps;
export function withCreateTeamMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateTeamMutationMutation,
  CreateTeamMutationMutationVariables,
  CreateTeamMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateTeamMutationMutation, CreateTeamMutationMutationVariables, CreateTeamMutationProps<TChildProps>>(CreateTeamMutationDocument, {
      alias: 'withCreateTeamMutation',
      ...operationOptions
    });
};
export type CreateTeamMutationMutationResult = ApolloReactCommon.MutationResult<CreateTeamMutationMutation>;
export type CreateTeamMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTeamMutationMutation, CreateTeamMutationMutationVariables>;
export const LoginMutationDocument = gql`
    mutation LoginMutation($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    path
    message
  }
}
    `;
export type LoginMutationMutationFn = ApolloReactCommon.MutationFunction<LoginMutationMutation, LoginMutationMutationVariables>;
export type LoginMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutationMutation, LoginMutationMutationVariables>, 'mutation'>;

    export const LoginMutationComponent = (props: LoginMutationComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutationMutation, LoginMutationMutationVariables> mutation={LoginMutationDocument} {...props} />
    );
    
export type LoginMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutationMutation, LoginMutationMutationVariables> & TChildProps;
export function withLoginMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutationMutation,
  LoginMutationMutationVariables,
  LoginMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutationMutation, LoginMutationMutationVariables, LoginMutationProps<TChildProps>>(LoginMutationDocument, {
      alias: 'withLoginMutation',
      ...operationOptions
    });
};
export type LoginMutationMutationResult = ApolloReactCommon.MutationResult<LoginMutationMutation>;
export type LoginMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutationMutation, LoginMutationMutationVariables>;
export const RegisterMutationDocument = gql`
    mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
  register(data: {email: $email, password: $password, username: $username}) {
    path
    message
  }
}
    `;
export type RegisterMutationMutationFn = ApolloReactCommon.MutationFunction<RegisterMutationMutation, RegisterMutationMutationVariables>;
export type RegisterMutationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutationMutation, RegisterMutationMutationVariables>, 'mutation'>;

    export const RegisterMutationComponent = (props: RegisterMutationComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutationMutation, RegisterMutationMutationVariables> mutation={RegisterMutationDocument} {...props} />
    );
    
export type RegisterMutationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutationMutation, RegisterMutationMutationVariables> & TChildProps;
export function withRegisterMutation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutationMutation,
  RegisterMutationMutationVariables,
  RegisterMutationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutationMutation, RegisterMutationMutationVariables, RegisterMutationProps<TChildProps>>(RegisterMutationDocument, {
      alias: 'withRegisterMutation',
      ...operationOptions
    });
};
export type RegisterMutationMutationResult = ApolloReactCommon.MutationResult<RegisterMutationMutation>;
export type RegisterMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutationMutation, RegisterMutationMutationVariables>;