export type LoginData = {
  emailOrUsername: string;
  password: string;
  rememberMe: boolean;
};

export type RegistrationData = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
};

export type FulfilledResponse = {
  message: string;
};

export type RejectedResponse = {
  status: number;
  data: {
    message: string;
  };
};

export type PostData = {
  _id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isFake?: boolean;
};

export type PostDataDisplay = Pick<PostData, 'title' | 'content'>;

export interface RequestData {
  page: number;
  search: string;
  sort: string;
}

export interface ModalData {
  post: PostData | null;
  isCreate: boolean;
  isUpdate: boolean;
}

export interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface SortData {
  sortingValues: {
    label: string;
    value: string;
  }[];
  defaultValue: string;
}
