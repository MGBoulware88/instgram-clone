import { Avatar, Box, Flex, Button, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import useTimestampConverter from "../../hooks/useTimestampConverter";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/useFollowUser";

const PostHeader = ({ post, creator }) => {
  const convertTimestamp = useTimestampConverter();
  const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(post.createdBy);

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
        <Button
          fontSize={12}
          size={"xs"}
          background={"transparent"}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isUpdating={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  )
}

export default PostHeader