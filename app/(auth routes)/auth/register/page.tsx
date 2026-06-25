import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import Image from "next/image";

//metadata
const register = () => {
  return (
    <>
      <RegistrationForm />
      <Image src="/leleka.png" alt="leleka" width={720} height={900} priority />
    </>
  );
};
export default register;
