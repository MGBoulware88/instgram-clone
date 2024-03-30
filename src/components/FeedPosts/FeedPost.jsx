import { Box, Image } from "@chakra-ui/react"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} creator={userProfile} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt="Post Image" />
      </Box>
      {/* <PostFooter username={username} /> */}
    </>
  )
}

export default FeedPost