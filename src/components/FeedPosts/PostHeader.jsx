import { Avatar, Box, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import useTimestampConverter from "../../hooks/useTimestampConverter";
import { Link } from "react-router-dom";

const PostHeader = ({ post, creator }) => {
  const convertTimestamp = useTimestampConverter();

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {creator ? (
          <Link to={`/${creator.username}`} >
            <Avatar src={creator.profilePicURL || ""} alt="user profile photo" size={"sm"} />
          </Link>

        ) : (
          <SkeletonCircle size={"10"} />
        )}
        <Flex fontSize={"12px"} fontWeight={"bold"} gap={2}>
          {creator ? (
            <Link to={`/${creator?.username}`} >
              {creator?.username}{" "}
            </Link>

          ) : (
            <Skeleton w={"100px"} h={"10px"} />
          )}
          <Box color={"gray.500"}>
            • {convertTimestamp(post.createdAt)}
          </Box>

        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  )
}

export default PostHeader