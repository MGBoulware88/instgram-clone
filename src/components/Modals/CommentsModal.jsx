import { Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, } from "@chakra-ui/react";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const {isCommenting, handlePostComment} = usePostComment();
  const commentRef = useRef();
  const commentsContainerRef = useRef();

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value="";
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };
    // wrapping in timeout to avoid errors from React due to render order
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100)
    }

  },[isOpen, post.comments.length])

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}>
            {post.comments.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </Flex>
          <form style={{ marginTop: "2rem" }} onSubmit={handleSubmitComment}>
            <Input placeholder='Comment' size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;