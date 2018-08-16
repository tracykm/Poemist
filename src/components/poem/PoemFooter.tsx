import * as React from "react";
import UsernameLink from "src/components/universal/UsernameLink";

const PoemFooter = ({
  authorUsername,
  authorId
}: {
  authorUsername: string;
  authorId: number;
}) => (
  <div className="poem-footer">
    <UsernameLink userId={authorId} username={authorUsername} />
  </div>
);

export default PoemFooter;
