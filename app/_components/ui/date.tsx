"use client";

function FormatDate({ date }) {
  return (
    <time dateTime={date}>
      {new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
      })}
    </time>
  );
}

export { FormatDate };
