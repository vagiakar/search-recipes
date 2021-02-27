import React, { useEffect } from "react";

export default function Notification({ notification, setNotification }) {
  const { type, text } = notification;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification({ notFound: false, type: "", text: "" });
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <div className={type}>
      <p>{text}</p>
    </div>
  );
}
