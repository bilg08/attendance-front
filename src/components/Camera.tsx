import Webcam from "react-webcam";
import Button from "./Button";
import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useUser from "@/global/user";
import useModal from "@/hooks/useModal";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const imageformat = 'image/jpeg';
function getPresignedUrlByType(type: string) {
  return type === 'target' ? process.env.NEXT_PUBLIC_AWS_getPresignedUrlToTargetImages : process.env.NEXT_PUBLIC_AWS_getPresignedUrlToSourceImages
}
export default function Camera() {
  const {user} = useUser();
  const userid = user.id;
  const {onOpen, onClose} = useModal()
  async function getPresignedUrl(type: string) {
    let url = getPresignedUrlByType(type) as string;
    console.log(url);
    
    try {
      const res = await axios.post(
        url,
        {
          "ContentType": imageformat,
          "id": userid,
        },

      );;
      return res.data.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const uploadFileToS3 = useCallback((imageasbase64: string, type: string) => {
    if (!imageasbase64) return;
    onOpen()
    fetch(imageasbase64).then((res) => res.blob()).then(async (blob) => {
      const jpegFile = new File([blob], `${userid}.jpeg`, {
        type: 'image/jpeg',
      });

      try {
        const presignedUrl = await getPresignedUrl(type);
        try {
          let options = {
            headers: {
              'Content-Type': jpegFile.type
            },
          };
          await axios.put(presignedUrl, jpegFile, options);
          onClose();
          if(type === 'target') {
            onOpen()
              const res = await axios.post(`https://c3fgf91h8c.execute-api.us-east-1.amazonaws.com/dev/getResult`, {
              userid: userid,
              date: '2023-04-14'
            });
            onClose()
            toast.success(res.data.data)
          }
        } catch (error: any) {}
      } catch (error: any) {}
    })
  }, [])

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        screenshotFormat="image/jpeg"
        width={800}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <>
            <Button onClick={() => {
              const imageSrc = getScreenshot();
              uploadFileToS3(imageSrc, 'source');
            }}>
              Суурь зургаа оруулах
            </Button>
            <Button onClick={() => {
              const imageSrc = getScreenshot();
              uploadFileToS3(imageSrc, 'target');
            }}>
              Өнөөдрийн зургаа оруулах
            </Button>
          </>
        )}
      </Webcam>
    </>
  )
}