import { Box, Container, Flex, Image, VStack } from '@chakra-ui/react'
import AuthFormRegisterFirst from '../../components/AuthForm/AuthFormRegisterFirst'

const AuthPageRegisterFirst = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxWidth={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          {/* Left Side */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="phone image" />
          </Box>

          {/* Right Side */}
          <VStack spacing={4} align={"stretch"}>
            <AuthFormRegisterFirst />
            <Box textAlign={"center"}>Get the app</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore Icon" />
              <Image src="/microsoft.png" h={"10"} alt="Microsoft Icon" />
            </Flex>
          </VStack>
        </Flex>

      </Container>
    </Flex>
  )
}

export default AuthPageRegisterFirst