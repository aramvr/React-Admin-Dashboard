const postTypes = {
  posts: {
    name: 'Posts',
    postType: 'posts',
    SingularName: 'Post',
    taxonomies: ['tags', 'categories'],
    fields: ['title', 'content'],
  },
  pages: {
    name: 'Pages',
    postType: 'pages',
    SingularName: 'Page',
    fields: ['title', 'content'],
    taxonomies: [],
  },
  team: {
    name: 'Team',
    postType: 'team',
    SingularName: 'Member',
    fields: ['title', 'content'],
    taxonomies: ['tags'],
  },
  attachment: {
    name: 'Media',
    postType: 'attachment',
    SingularName: 'Media',
    fields: ['title'],
    taxonomies: [],
  },
};
export default postTypes;
