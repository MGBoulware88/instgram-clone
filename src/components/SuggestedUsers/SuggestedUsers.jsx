import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import SuggestedHeader from "./SuggestedHeader"
import SuggestedUser from "./SuggestedUser"
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"
import { Link } from "react-router-dom"

const SuggestedUsers = () => {
  const {isLoading, suggestedUsers} = useGetSuggestedUsers();

  //TODO: render loading skeleton
  if (isLoading) return null
    return (
        <VStack py={8} px={6} gap={4}>
            <SuggestedHeader />

            {suggestedUsers.length !== 0 && (
              <Flex alignItems={"center"} justifyContent={"space-between"} w="full">
              <Text fontSize={12} fontWeight="bold" color="gray.500">
                  Suggested for you
              </Text>
              <Text fontSize={12} fontWeight={"bold"} _hover={{ color: "gray.400" }} cursor={"pointer"}>
                  See All
              </Text>
          </Flex>
            )}

            {suggestedUsers.map(user => {
              return <SuggestedUser user={user} key={user.uid} />
            })}

            <Box
                fontSize={12} color={"gray.500"} mt={5} alignSelf={"flex-start"}  >
                © 2024 Built By {" "}
                <Link to={"https://github.com/MGBoulware88"} target={"_blank"}>
                <span style={{color: "rgb(66, 153, 196)", fontSize: "12"}}>Gray Boulware</span>
                </Link>

            </Box>

        </VStack>
    )
}

export default SuggestedUsers