export type AuthData = {
  email: string;
  password: string;
};

export type ProfileSetupData = {
  name: string;
  profilePicture?: File;
  phoneNumber?: string;
  bio?: string;
  gender: string;
  localNumber?: string;
  countryCode?: string;
};

export type CreateBookData = {
  title: string;
  coverImage: File | string;
  description: string;
  keywords: string[];
  status: string;
  categoryId: string;
};

export type profileFetchData = {
  name: string;
  email?: string;
  profilePicture?: string;
  countryCode: string;
  localNumber: string;
  bio?: string;
  gender: string;
  userId: number;
};

export type otherProfileData = {
  userId: number;
  name: string;
  profilePicture: string;
  bio: string;
  gender: string;
  cratedAt: string;
};

export type createChapterData = {
  title: string;
  content: string;
  status: string;
  priority: number;
  slug: string;
};

export type categoryData = {
  categoryIds: string[];
};

export type updateBookType = {
  title: string;
  coverImage?: File;
  description: string;
  keywords: string[];
  status: string;
  slug?: string;
};

export type Book = {
  bookId: string;
  title: string;
  coverImage: string;
  description: string;
  slug: string;
  keywords: string[];
  status: string;
  user: {
    name: string;
    profilePicture: string;
    userId: number;
  };
  category: {
    categoryId: string;
    title: string;
    icon: string;
    priority: string;
  };
  favoriteCount: number;
  isFavorite: string;
};

export type fetchBookData = {
  items: Book[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type BookHistoryData = {
  book: Book;
  userId: number;
  bookId: string;
  user: {
    name: string;
    profilePicture: string;
    userId: number;
  };
};

export type favoriteBookData = {
  book: Book;
  userId: number;
  bookId: string;
  user: {
    name: string;
    profilePicture: string;
  };
};

export type fetchFavoriteBookData = {
  items: favoriteBookData[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type Chapter = {
  chapterId: string;
  title: string;
  content: string;
  priority: number;
  status: string;
  book: Book[];
};

export type fetchChapterData = Chapter[];

export type commentData = {
  comment: string;
  slug: string;
  parentCommentId?: number;
};

export type replyComment = {
  comment: string;
  replyTo: number;
};

export type updateCommentData = {
  comment: string;
};

export type ChildCommentDataArray = {
  id: number;
  comment: string;
  replyTo: string;
  createdAt: string;
  updatedTime: string;
  user: {
    userId: number;
    name: string;
    profilePicture: string;
  };
};

export type ParentCommentDataArray = {
  commentId: number;
  comment: string;
  replyTo: string | null;
  createdAt: string;
  updatedTime: string;
  user: {
    userId: number;
    name: string;
    profilePicture: string;
  };
  parentComment: string | null;
  replies: ChildCommentDataArray[];
};

export type getCommentData = {
  items: ParentCommentDataArray[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type favoriteData = {
  slug: string;
};

export type PasswordChangeData = {
  oldPassword: string;
  newPassword: string;
};

export type ChapterProgressData = {
  slug: string;
  chapterId: number;
};

export type UpdateProgressData = {
  chapterId: number;
};

export type BookHisoryData = {
  bookSlug: string;
};

export type relatedBookData = {
  items: Book[];
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};
