import React from "react";

interface TryProps {
  tryInfo: TryInfo;
}
interface TryInfo {
  try: string;
  result: string;
}

const TryComponent: React.FC<TryProps> = ({ tryInfo }) => {
  return (
    <li>
      {tryInfo.try}
      <div>{tryInfo.result}</div>
    </li>
  );
}

const Try = React.memo(TryComponent);
Try.displayName = 'Try';

export default Try;