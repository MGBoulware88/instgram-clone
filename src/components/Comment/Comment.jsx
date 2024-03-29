import { Avatar, Flex, Text } from "@chakra-ui/react"
import useTimestampConverter from "../../hooks/useTimestampConverter";

const Comment = ({ comment }) => {
  const convertTimestamp = useTimestampConverter();

  return (
    <Flex gap={4}>
      {/* <Avatar src={profilePic} name={username} size="sm" /> */}
      <Flex direction={"column"}>
        <Flex gap={2}>
          <Text fontWeight={"bold"} fontSize={12}>
            {/* {username} */}
          </Text>
          <Text fontSize={14}>
            {comment.comment}
          </Text>
          <Text fontSize={12} color={"gray"}>
            {convertTimestamp(comment.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Comment