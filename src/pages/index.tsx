import Camera from "@/components/Camera";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

export default function Home() {
  return (
   <main className='flex justify-center mt-10 items-center'>
     <div className='relative'>
      <Camera/>
    </div>
   </main>
  )
}
