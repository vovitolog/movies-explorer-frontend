import "./SectionHeader.css"

export function SectionHeader(props) {
  return (
    <div className="section-header">
        <h2 className="section-header__title">{props.title}</h2>
    </div>
  );
}
