import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikeOrUnlikePost from "../../hooks/useLikeOrUnlikePost";
import useTimestampConverter from "../../hooks/useTimestampConverter";
import CommentsModal from "../Modals/CommentsModal";

const PostFooter = ({ post, isProfilePage, creator }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const authUser = useAuthStore(state => state.user);
  const commentRef = useRef();
  const { isUpdating, isLiked, likes, handleLikePost } = useLikeOrUnlikePost(post);
  const convertTimestamp = useTimestampConverter();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onPostComment = async () => {

    await handlePostComment(post.id, comment);
    setComment("");
  }



  return (
    <Box mb={8} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} mb={2} mt={3}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18} isLoading={isUpdating}>
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={"sm"}>
        {likes === 1 && `${likes} like`}
        {likes > 1 && `${likes} likes`}
      </Text>
      {isProfilePage && (
        <Text fontSize={"12"} color={"gray"}>
          Posted {convertTimestamp(post.createdAt)}
        </Text>
      )}
      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"}>
            {creator?.username}{" "}
            <Text fontWeight={400} as="span">
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text fontSize="sm" color={"gray"} cursor={"pointer"} onClick={onOpen}>
              View all {post.comments.length} comments
            </Text>
          )}
          {isOpen && <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />}
        </>
      )}

      {authUser && (
        <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
          <InputGroup>
            <Input variant={"flushed"} placeholder={"Add a comment. . ."} fontSize={14} value={comment} onChange={e => setComment(e.target.value)} ref={commentRef} />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{ color: "white" }}
                bg={"transparent"}
                onClick={onPostComment}
                isLoading={isCommenting}
              >Post</Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  )
}

export default PostFooter