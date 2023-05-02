export default function SelectLanguage({
  selectedLanguage,
  handleLanguageChange,
}) {
  return (
    <select
      className="select tex-xl"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option val="python">python</option>
      <option val="javascript">javascript</option>
    </select>
  );
}
