import Webcam from "react-webcam";
import Button from "./Button";
import axios from "axios";
import { useCallback, useState } from "react";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
const imageformat = 'image/jpeg';
function urlType(type: string) {
  console.log(type)
  return type === 'target' ? 'getPresignedUrlToTargetImages' : 'getPresignedUrlToSourceImages'
}
export default function Camera() {
  async function getPresignedUrl(type: string, userid?: string) {
    let url = `https://13sc81lk1d.execute-api.us-east-1.amazonaws.com/dev/${urlType(type)}`
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
    fetch(imageasbase64).then((res) => res.blob()).then(async (blob) => {
      const jpegFile = new File([blob], '30ee2c62-a934-4a0a-af11-434a99f3304a.jpeg', {
        type: 'image/jpeg',
      });

      try {
        const presignedUrl = await getPresignedUrl(type, '30ee2c62-a934-4a0a-af11-434a99f3304a');
        try {
          let options = {
            headers: {
              'Content-Type': jpegFile.type
            },
          };
          await axios.put(presignedUrl, jpegFile, options);
        } catch (error: any) {
          console.log(error.message);
        }
      } catch (error: any) {
        console.log(error.message);
      }
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