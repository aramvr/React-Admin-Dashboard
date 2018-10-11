const initialState = {
  users: [
    {
      id: 1,
      username: 'admin',
      email: 'email@example.com',
      password: 'admin',
      nickname: 'Admin',
      role: 'administrator',
    },
    {
      id: 2,
      username: 'editor',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
    {
      id: 3,
      username: 'editor3',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
    {
      id: 4,
      username: 'editor4',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
    {
      id: 5,
      username: 'editor5',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
    {
      id: 6,
      username: 'editor6',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
    {
      id: 7,
      username: 'editor7',
      email: 'email@example.com',
      password: 'editor',
      nickname: 'Editor',
      role: 'editor',
    },
  ],
  posts: [
    {
      id: 1,
      title: 'Hello World',
      content: 'lorem ipsum',
      postType: 'posts',
    },
    {
      id: 10,
      name: 'cat-1.jpg',
      url: 'https://picsum.photos/1000/650?image=10',
      postType: 'attachment',
    },
    {
      id: 11,
      name: 'cat-2.jpg',
      url: 'https://picsum.photos/1000/650?image=11',
      postType: 'attachment',
    },
    {
      id: 12,
      name: 'bear-1.jpg',
      url: 'https://picsum.photos/1000/650?image=12',
      postType: 'attachment',
    },
    {
      id: 13,
      name: 'bear-2.jpg',
      url: 'https://picsum.photos/1000/650?image=13',
      postType: 'attachment',
    },
  ],
  team: [
    {
      id: 4,
      title: 'Aram',
      content: 'Name',
      postType: 'team',
    },
  ],
  terms: [
    {
      id: 1,
      postType: 'posts',
      taxType: 'categories',
      name: 'Uncategories',
      slug: 'uncategories',
    },
    {
      id: 2,
      postType: 'posts',
      taxType: 'tags',
      name: 'Cloud',
      slug: 'cloud',
    },
    {
      id: 3,
      postType: 'team',
      taxType: 'categories',
      name: 'American',
      slug: 'american',
    },
  ],
  term_links: [
    {
      post_id: 1,
      term_id: 1,
    },
    {
      post_id: 1,
      term_id: 2,
    },
  ],
  options: {
    site_title: 'Hi!',
  },
};

export default initialState;
