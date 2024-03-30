import { Avatar, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Image, Text, Divider, VStack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";
import Caption from "../Comment/Caption";
import useDeletePost from "../../hooks/useDeletePost";

const PostsModal = ({ isOpen, onClose, userProfile, post }) => {
  const { handleDeletePost, isDeleting, authUser } = useDeletePost(post);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bgColor={"black"} pb={5}>
          <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} maxH={"90vh"} minH={"50vh"}>
            <Flex overflow={"hidden"} flex={1.5} justifyContent={"center"} alignItems={"center"}>
              <Image src={post.imageURL} alt="profile post" w={"100%"}/>
            </Flex>
            <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={4}>
                  <Avatar src={userProfile?.profilePicURL || ""} size={"sm"} name="gray" />
                  <Text fontWeight={"bold"} fontSize={12}>
                    {userProfile?.username || "John Doe"}
                  </Text>
                </Flex>
                {/* 
                    Added optional chaining to this check because you can view posts without a logged in user.
                    Now, it handles all 3 use cases:
                      logged in user is viewing own post
                      logged in user is viewing another user's post
                      a visitor is viewing a post
                  */}
                {authUser?.uid === userProfile?.uid && (
                  <Button _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} size={"sm"} bg={"transparent"}
                    onClick={handleDeletePost}
                    isLoading={isDeleting}
                  >
                    <MdDelete size={20} cursor={"pointer"} />
                  </Button>
                )}
              </Flex>
              <Divider my={4} bg={"gray.500"} />

              <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                {post.caption && <Caption post={post} />}
                {post.comments.map(comment => {
                  return (
                    <Comment key={comment.id} comment={comment} />
                  )
                })}
              </VStack>
              <Divider my={4} bg={"gray.500"} />

              <PostFooter isProfilePage={true} post={post} creator={post.createdBy} />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PostsModal;