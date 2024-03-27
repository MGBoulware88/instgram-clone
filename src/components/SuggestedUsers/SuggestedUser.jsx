import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react"
import useFollowUser from "../../hooks/useFollowUser"
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
  const {isFollowing, isUpdating, handleFollowUser} = useFollowUser(user.uid);
  const authUser = useAuthStore(state => state.user);
  console.log(user);

  const onFollowUser = async () => {
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing 
        ? user.followers.filter((follower) => follower !== authUser.uid)
        : [...user.followers, authUser.uid],
     })
  }

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2} >
                <Avatar src={user.profilePicURL} size={"md"} />
                <VStack spacing={2}>
                    <Box fontSize={12} fontWeight={"bold"} >
                        {user.fullName}
                    </Box>
                    <Box fontSize={11} color={"gray.500"}>
                      {/* followers/following come back as null when there are none, so I have to manually insert the 0
                          expected an empty array, but oh well -_- */}
                        {user.followers?.length || 0} {user.followers?.length === 1 ? "follower" : "followers"}
                    </Box>
                </VStack>
            </Flex>
            {authUser.uid !== user.uid && (
              <Button
              fontSize={13}
              bg={"transparent"}
              p={0}
              h={"max-content"}
              fontWeight={"medium"}
              color={"blue.400"}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              onClick={onFollowUser}
              isLoading={isUpdating}
          >
              {isFollowing ? "Unfollow" : "Follow"}
          </Button>
            )}

        </Flex>
    )
}

export default SuggestedUser