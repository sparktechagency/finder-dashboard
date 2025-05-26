import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import Button from "@/components/layout/shared/Button";
import {
  useCreateAboutMutation,
  useGetAboutQuery,
} from "@/redux/apiSlice/settings/settings";

export default function AboutUS() {
  const { data, isError, isLoading, refetch } = useGetAboutQuery(undefined);
  console.log(data?.data[0]?.text);
  const [createAbout] = useCreateAboutMutation();
  // console.log(createAbout);

  const editor = useRef(null);

  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(data?.data?.text);
    if (data?.data[0]?.text) {
      setContent(data?.data[0]?.text || "");
    }
  }, [data]);

  if (isLoading) {
    return <span>Loading ....</span>;
  }
  if (isError) {
    return <span>data not found ....</span>;
  }

  const handleOnSave = async () => {
    const data = { text: content };
    console.log(data);
    await createAbout(data);
    refetch();
  };
  return (
    <>
      <div className="">
        <div className="">
          <JoditEditor
            className="border-none "
            ref={editor}
            value={content}
            config={{ height: 550, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <Button
        onClick={handleOnSave}
        htmlType="submit"
        className="bg-[#F79535] hover:bg-[#F79535] text-black font-medium text-lg px-6 w-full mt-4 h-10"
      >
        Save
      </Button>
    </>
  );
}
