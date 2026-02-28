import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

interface PlatformSelectProps {
  onChange: (value: string) => void;
}

const PlatformSelect = ({ onChange }: PlatformSelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Platform" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="instagram">Instagram</SelectItem>
        <SelectItem value="facebook">Facebook</SelectItem>
        <SelectItem value="twitter">Twitter</SelectItem>
        <SelectItem value="linkedin">LinkedIn</SelectItem>
        <SelectItem value="pinterest">Pinterest</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default PlatformSelect;