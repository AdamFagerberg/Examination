import "./ItemLabel.css";

type ItemLabelProps = {
  title: string;
  onClick: () => void;
};

export default function ItemLabel({ title, onClick }: ItemLabelProps) {
  return <button onClick={onClick}>{title}</button>;
}
