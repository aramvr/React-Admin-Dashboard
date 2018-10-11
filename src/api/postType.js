// @flow
import moment from 'moment';
import dataBase from './config';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[\s\W-]+/g, '-'); // Replace spaces, non-word characters and dashes with a single dash (-)
}

const postType = {
  addPost(postTypeName: string, data: any, callback: any) {
    const id = dataBase.db.posts[dataBase.db.posts.length - 1]
      ? dataBase.db.posts[dataBase.db.posts.length - 1].id + 1
      : 1;

    const fullData = {
      id,
      postType: postTypeName,
      post_status: 'publish',
      ...data,
    };
    if (!data.date) {
      fullData.date = moment();
    }
    dataBase.db.posts.push(fullData);
    dataBase.updateDb();
    this.postTaxonomyLinks(id, data, postTypeName);
    setTimeout(callback(fullData), 100);
  },

  editPost(id: number, data: any, postTypeName: string, callback: any) {
    const postId = parseInt(id, 0);
    const index = dataBase.db.posts.findIndex(post => post.id === postId);
    dataBase.db.posts[index] = { ...dataBase.db.posts[index], ...data };
    dataBase.updateDb();
    this.postTaxonomyLinks(id, data, postTypeName);

    setTimeout(callback(dataBase.db.posts[index]), 100);
  },

  postTaxonomyLinks(id: number, data: any, postTypeName: string) {
    if (data.categories) {
      data.categories.map((cat) => {
        this.linkTaxonomies(id, cat, () => true);
        return true;
      });
    }
    if (data.tags) {
      data.tags.map((tag) => {
        this.addTaxonomy(postTypeName, 'tags', { name: tag }, (res) => {
          this.linkTaxonomies(id, res.id, () => true);
        });
        return true;
      });
    }
  },

  getPostById(id: number, callback: any) {
    const postId = parseInt(id, 0);
    const data = dataBase.db.posts.filter(post => post.id === postId);
    setTimeout(callback(data[0]), 100);
  },
  getPosts(postTypeName: string, callback: any) {
    const data = dataBase.db.posts.filter(post => post.postType === postTypeName);
    data.sort((a, b) => b.id - a.id);
    setTimeout(callback(data), 100);
  },
  deletePost(id: number, callback: any) {
    const postId = parseInt(id, 0);
    const index = dataBase.db.posts.findIndex(post => post.id === postId);
    dataBase.db.posts.splice(index, 1);
    dataBase.updateDb();
    setTimeout(callback(true), 100);
  },
  deletePosts(ids: any, callback: any) {
    ids.map((id) => {
      const index = dataBase.db.posts.findIndex(post => post.id === id);
      dataBase.db.posts.splice(index, 1);
      return true;
    });
    dataBase.updateDb();
    setTimeout(callback(true), 100);
  },
  restorePosts(ids: any, callback: any) {
    ids.map((id) => {
      const index = dataBase.db.posts.findIndex(post => post.id === id);
      dataBase.db.posts[index].post_status = 'publish';
      return true;
    });
    dataBase.updateDb();
    setTimeout(callback(true), 100);
  },
  trashPosts(ids: any, callback: any) {
    ids.map((id) => {
      const index = dataBase.db.posts.findIndex(post => post.id === id);
      dataBase.db.posts[index].post_status = 'trash';
      return true;
    });
    dataBase.updateDb();
    setTimeout(callback(true), 100);
  },

  addTaxonomy(postTypeName: string, taxTypeName: string, data: any, callback: any) {
    const assignData = data;
    const id = dataBase.db.terms.length + 1;

    if (!assignData.slug) {
      assignData.slug = slugify(data.name);
    } else {
      assignData.slug = slugify(data.slug);
    }
    if (taxTypeName === 'tags') {
      const tagsSlugExist = dataBase.db.terms.filter(tag => assignData.slug === tag.slug);
      if (tagsSlugExist.length) {
        setTimeout(callback(tagsSlugExist[0]), 100);
        return;
      }
    }
    if (assignData.parent) {
      this.getTaxonomyById(assignData.parent, (cat) => {
        if (!cat.parent) {
          assignData.parentsCount = 1;
        } else {
          assignData.parentsCount = cat.parentsCount + 1;
        }
      });
    }

    const fullData = {
      id,
      postType: postTypeName,
      taxType: taxTypeName,
      ...assignData,
    };
    dataBase.db.terms.push(fullData);
    dataBase.updateDb();
    setTimeout(callback(fullData), 100);
  },

  getTaxonomyById(id: number, callback: any) {
    const catId = parseInt(id, 0);
    const data = dataBase.db.terms.filter(term => term.id === catId);
    setTimeout(callback(data[0]), 100);
  },
  linkTaxonomies(postId: number, termId: number, callback: any) {
    const data = {
      post_id: postId,
      term_id: termId,
    };
    dataBase.db.term_links.push(data);
    dataBase.updateDb();
    setTimeout(callback(data), 100);
  },
  getTaxonomies(postTypeName: string, taxTypeName: string, callback: any) {
    const data = dataBase.db.terms
      .filter(term => term.postType === postTypeName && term.taxType === taxTypeName)
      .map((cat) => {
        const count = dataBase.db.term_links.filter(link => link.term_id === cat.id);
        return {
          count: count.length,
          ...cat,
        };
      });
    setTimeout(callback(data), 100);
  },

  async uploadImage(imageFile: any, callback: any) {
    const formData = new FormData();
    formData.append('image', imageFile);
    await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 2837ac780e78e0e', // //0c0dfd00e701023
      },
      body: formData,
      data: formData,
      mimeType: 'multipart/form-data',
      processData: false,
      contentType: false,
      async: true,
      crossDomain: true,
    })
      .then(resp => resp.json()) // Transform the data into json
      .then((data) => {
        callback(data);
      });
  },
};

export default postType;
