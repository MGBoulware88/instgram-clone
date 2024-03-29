import { create } from 'zustand';

const usePostStore = create(set => ({
  posts: [],
  createPost: post => set(state => ({ posts: [post, ...state.posts] })),
  deletePost: id => set(state => ({ posts: state.posts.filter(post => post.id !== id) })),
  setPosts: posts => set({ posts }),
  /* 
    addComment looks complicated compared to the other state management functions in this project, but it really just does 3 things:
      map through all posts to find the one with id matching the postId arg (required because there can be more than 1 post in state)
      spread the rest of the post data and the rest of the comments to ensure nothing else changes
      add the comment to that post from comment arg as the last comment in the array (so it shows last as intended)
  */
  addComment: (postId, comment) => set(state => ({
    posts: state.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment]
        }

      }
      return post;

    })
  }))
}));

export default usePostStore;