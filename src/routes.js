import Dashboard from './pages/dashboard/index';

import Posts from './pages/posts/index';
import addPost from './pages/posts/Add';
import postCategories from './pages/posts/Categories';
import postTags from './pages/posts/Tags';

import Pages from './pages/pages/index';
import addPages from './pages/pages/Add';

import Users from './pages/users/index';
import UserProfile from './pages/users/profile';
import addUser from './pages/users/addUser';
import editUser from './pages/users/editUser';

import MediaLibrary from './pages/media/index';

import generalSettings from './pages/settings/index';
import frontEndSettings from './pages/settings/frontEnd';

const routes = {
  navBarItems: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
    },
    {
      path: '/posts',
      name: 'Posts',
      icon: 'profile',
      submenu: [
        {
          path: '/posts/',
          name: 'All Posts',
        },
        {
          path: '/posts/add',
          name: 'Add New',
        },
        {
          path: '/posts/categories',
          name: 'Categories',
        },
        {
          path: '/posts/tags',
          name: 'Tags',
        },
      ],
    },

    {
      path: '/pages/',
      name: 'Pages',
      icon: 'file-text',
      submenu: [
        {
          path: '/pages/',
          name: 'All Pages',
        },
        {
          path: '/pages/add',
          name: 'Add New',
        },
      ],
    },

    {
      path: '/media/',
      name: 'Media',
      icon: 'picture',
      submenu: [
        {
          path: '/media/',
          name: 'Media Library',
        },
      ],
    },
    {
      path: '/users/',
      name: 'Users',
      icon: 'user',
      submenu: [
        {
          path: '/users/',
          name: 'All Users',
        },
        {
          path: '/users/add',
          name: 'Add New',
        },
        {
          path: '/users/profile',
          name: 'Your Profile',
        },
      ],
    },

    {
      path: '/menus/',
      name: 'Menus',
      icon: 'bars',
    },
    {
      path: '/settings/',
      name: 'Settings',
      icon: 'setting',
      submenu: [
        {
          path: '/settings/',
          name: 'General',
        },
        {
          path: '/settings/frontend/',
          name: 'Frontend',
        },
      ],
    },
  ],
  routes: [
    {
      path: '/dashboard',
      component: Dashboard,
      exact: true,
    },
    {
      path: '/posts',
      component: Posts,
      exact: true,
    },

    {
      path: '/posts/add/',
      component: addPost,
    },
    {
      path: '/posts/categories/',
      component: postCategories,
    },
    {
      path: '/posts/tags/',
      component: postTags,
    },
    {
      path: '/posts/:id',
      component: addPost,
    },

    {
      path: '/pages/',
      component: Pages,
      exact: true,
    },

    {
      path: '/pages/add',
      component: addPages,
    },
    {
      path: '/pages/:id',
      component: addPages,
    },
    {
      path: '/media/',
      component: MediaLibrary,
    },
    {
      path: '/users/',
      component: Users,
      exact: true,
    },
    {
      path: '/users/profile',
      component: UserProfile,
    },
    {
      path: '/users/add',
      component: addUser,
    },
    {
      path: '/users/:id',
      component: editUser,
    },

    {
      path: '/menus/',
      component: Dashboard,
    },
    {
      path: '/settings/',
      component: generalSettings,
      exact: true,
    },
    {
      path: '/settings/frontend',
      component: frontEndSettings,
    },
  ],
};
export default routes;
