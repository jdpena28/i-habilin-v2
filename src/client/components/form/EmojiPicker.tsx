import { useState, FC, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  id: string;
  setValue: any;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ setValue, id }) => {
  const [emojiModalOpen, setEmojiModalOpen] = useState(false);
  const emojiRef = useRef(null);
  return (
    <div ref={emojiRef}>
      <button
        type="button"
        className="inline-block bg-primary !p-1 "
        onClick={() => {
          setEmojiModalOpen(!emojiModalOpen);
        }}>
        😀
      </button>
      {emojiModalOpen ? (
        <Picker
          className="absolute"
          data={data}
          onClickOutside={() => {
            setEmojiModalOpen(false);
          }}
          onEmojiSelect={(value: any) => {
            setValue(id, `${value.native}`);
            setEmojiModalOpen(false);
          }}
          noCountryFlgas
          previewPosition="none"
        />
      ) : null}
    </div>
  );
};

export default EmojiPicker;
