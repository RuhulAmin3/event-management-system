import { SelectContent, SelectItem } from "~/components/ui/select";

const SelectCategory = ({ label, value }: { label?: string, value?: string }) => {
  return (
    <SelectContent>
      {label && value && <SelectItem value={value}>{label}</SelectItem>}
      <SelectItem value="technology">Technology</SelectItem>
      <SelectItem value="business">Business</SelectItem>
      <SelectItem value="entertainment">Entertainment</SelectItem>
      <SelectItem value="sports">Sports</SelectItem>
      <SelectItem value="art">Art</SelectItem>
      <SelectItem value="workshop">Workshop</SelectItem>
    </SelectContent>
  )
}

export default SelectCategory