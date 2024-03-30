import { Box, Image, useDisclosure } from "@chakra-ui/react"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"
import PostsModal from "../Modals/PostsModal"

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PostHeader post={post} creator={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"} onClick={onOpen} cursor={"pointer"}>
        <Image src={post.imageURL} alt="Post Image" w={"100%"} />
      </Box>
      <PostFooter post={post} creator={userProfile} />

      <PostsModal isOpen={isOpen} onClose={onClose} userProfile={userProfile} post={post} />
    </>
  )
}

export default FeedPost;