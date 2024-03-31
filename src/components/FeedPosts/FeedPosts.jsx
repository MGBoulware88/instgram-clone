import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack, Text } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import { RxDoubleArrowRight } from "react-icons/rx";
import SuggestedUsers from "../SuggestedUsers/SuggestedUsers";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && [0, 1, 2, 3, 4].map((item, idx) => (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size="10" />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height="10px" w="200px" />
              <Skeleton height="10px" w="200px" />
            </VStack>
          </Flex>
          <Skeleton w="full">
            <Box h="500px">contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}
      {!isLoading && posts.length > 0 && (
        posts.map(post => (<FeedPost key={post.id} post={post} />))
      )}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontsize={"lg"} color={"whiteAlpha.800"} margin={"auto"}>
            You aren&apos;t following anyone. Follow some users to see posts on your home page! <RxDoubleArrowRight />
          </Text>

          <SuggestedUsers />
        </>
      )}

    </Container>
  );
};

export default FeedPosts