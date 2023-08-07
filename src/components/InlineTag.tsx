import React from 'react'

export default function InlineTag({chatWindowRef}: {chatWindowRef: React.RefObject<HTMLDivElement>}) {
  const tagRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    tagRef.current?.addEventListener("click", (e) => {
      const el = (e.target as Node).cloneNode(true) as HTMLDivElement;
      el.setAttribute('contenteditable', 'false');
      chatWindowRef.current?.appendChild(el);
    });
  }, [chatWindowRef]);
  
  return (
    <span
        style={{
          padding: "2px 8px",
          color: "white",
          border: "1px solid #111111",
          borderRadius: "1000px",
          cursor: "pointer",
          margin: "4px",
          width: "fit-content",
        }}
        ref={tagRef}
        className="label"
      >
        Tag 1
      </span>
  )
}
