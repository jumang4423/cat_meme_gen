import { Translate } from "./translate";

interface Props {
  textId: number;
}

export default function TransText({ textId }: Props) {
  return <div>{Translate(textId)}</div>;
}
