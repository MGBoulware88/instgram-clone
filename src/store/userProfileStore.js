// handles storing and setting user profile and profile posts
import {create} from "zustand";

const useUserProfileStore = create(set => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({userProfile}),
  addPost:post => set(state => ({
    userPorifle:{...state.userProfile, posts:[post.id, ...state.userProfile.posts]}
  }))
}))

export default useUserProfileStore;