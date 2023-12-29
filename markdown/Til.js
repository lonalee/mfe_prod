import React, { useState, useEffect } from "react";
import MarkDown from "markdown-to-jsx";

const Til = () => {
  const [post, setPost] = useState("");
  useEffect(() => {
    import("../markdown/tIl_20231129.md")
      .then((res) => {
        fetch(res.default)
          .then((res) => {
            console.log("res", res);
            res.text();
          })
          .then((res) => setPost(res))
          .catch((err) => console.log("error occured", err));
      })
      .catch((err) => console.log("error occured", err));
  });

  return (
    <div className="container">
      <MarkDown>{post}</MarkDown>
    </div>
  );
};

export default Til;
