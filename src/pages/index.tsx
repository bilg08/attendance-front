import Button from "@/components/Button";
import Camera from "@/components/Camera";
import Loader from "@/components/Loader";
import useUser from "@/global/user";
import { useRouter } from "next/router";

export default function Home() {
  const {setUser} = useUser();
  const router = useRouter();
  function logout() {
    setUser({});
    router.push('/auth')
  }
  return (
   <main className='flex justify-center mt-10 items-center'>
     <div className='relative'>
      <Camera />
      <Button onClick={logout}>
        Гарах
      </Button>
      <Loader />
    </div>
   </main>
  )
}
