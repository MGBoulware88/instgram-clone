import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import { useRef, useState } from "react";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isLoading, user, setUser, getUserProfile} = useSearchUser();
  //initial ref is ChakraUI's solution for auto focusing the input field of choice on opening modal
  const initialRef = useRef(null);
  const [userToSearch, setUserToSearch] = useState("");

  const handleSearchUser = e => {
    e.preventDefault();
    getUserProfile(userToSearch);
  }

	return (
		<>
			<Tooltip
				hasArrow
				label={"Search"}
				placement="right"
				ml={1}
				openDelay={500}
				display={{ base: "block", md: "none" }}
			>
				<Flex
					alignItems={"center"}
					gap={4}
					_hover={{ bg: "whiteAlpha.400" }}
					borderRadius={6}
					p={2}
					w={{ base: 10, md: "full" }}
					justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
				>
					<SearchLogo />
					<Box display={{ base: "none", md: "block" }}>Search</Box>
				</Flex>
			</Tooltip>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset={"slideInLeft"}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
          <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
            <ModalHeader>Search Users</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={handleSearchUser}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  {/* we want the user to be able to instantly start typing their search on open */}
                  <Input placeholder="search. . ." ref={initialRef} onChange={e => setUserToSearch(e.target.value)} />
                </FormControl>

                <Flex w={"full"} justifyContent={"flex-end"}>
                  <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
                    Search
                  </Button>
                </Flex>
              </form>
              {user && <SuggestedUser user={user} setUser={setUser}/>}
            </ModalBody>
          </ModalContent>
      </Modal>
		</>
	);
};

export default Search;