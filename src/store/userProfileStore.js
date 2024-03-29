// handles storing and setting user profile and profile posts
import { create } from "zustand";

const useUserProfileStore = create(set => ({
  userProfile: null,
  setUserProfile: userProfile => set({ userProfile }),
  //addPost & deletePost here only update what shows on the user profile, not the db
  addPost: post => set(state => ({
    userProfile: {
      ...state.userProfile, posts: [post.id, ...state.userProfile.posts]
    },
  })),
  deletePost: postId => set(state => ({
    userProfile: {
      ...state.userProfile, posts: state.userProfile.posts.filter(id => id !== postId),
    },
  })),
}))

export default useUserProfileStore;