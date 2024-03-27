import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "../../hooks/useRegister";

const Signup = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullName: "",
    username: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  return (
    <>
      <Input
        id="email"
        autoComplete="off"
        placeholder="Email"
        fontSize={14}
        type="email"
        value={inputs.email}
        onChange={e => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        id="username"
        autoComplete="off"
        placeholder="Username"
        fontSize={14}
        type="text"
        value={inputs.username}
        size="sm"
        onChange={e => setInputs({ ...inputs, username: e.target.value })}
      />
      <Input
        id="name"
        autoComplete="off"
        placeholder="Full Name"
        fontSize={14}
        type="text"
        value={inputs.fullName}
        size="sm"
        onChange={e => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <InputGroup>
        <Input
          id="password"
          autoComplete="off"
          placeholder="Password"
          fontSize={14}
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          size="sm"
          onChange={e => setInputs({ ...inputs, password: e.target.value })}
        />
        <InputRightElement h={"full"}>
          <Button variant={"ghost"} size={"sm"} onClick={() => { setShowPassword(!showPassword) }}>
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.code}
        </Alert>
      )}

      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} onClick={() => signup(inputs)} isLoading={loading}>
        Sign up
      </Button>
    </>
  );
};

export default Signup;