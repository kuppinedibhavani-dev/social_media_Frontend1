import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import PlatformSelect from "./PlatformSelect";

interface ScheduleData {
  title: string;
  content: string;
  platform: string;
  datetime: string;
}

const SchedulerForm = () => {
  const [form, setForm] = useState<ScheduleData>({
    title: "",
    content: "",
    platform: "",
    datetime: "",
  });

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.content ||
      !form.platform ||
      !form.datetime
    ) {
      alert("Please fill all fields");
      return;
    }

    console.log("Scheduled Post:", form); // backend will replace this later

    alert("Post Scheduled Successfully!");
    setForm({
      title: "",
      content: "",
      platform: "",
      datetime: "",
    });
  };

  return (
    <form
      onSubmit={submitForm}
      className="bg-white p-6 shadow-sm rounded-xl max-w-xl"
    >
      {/* Title */}
      <Input
        placeholder="Post Title"
        className="mb-4"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      {/* Content */}
      <Textarea
        placeholder="Write your content..."
        className="mb-4"
        value={form.content}
        onChange={(e) =>
          setForm({ ...form, content: e.target.value })
        }
      />

      {/* Platform */}
      <div className="mb-4">
        <PlatformSelect
          onChange={(value) =>
            setForm({ ...form, platform: value })
          }
        />
      </div>

      {/* Date & Time */}
      <Input
        type="datetime-local"
        className="mb-4"
        value={form.datetime}
        onChange={(e) =>
          setForm({ ...form, datetime: e.target.value })
        }
      />

      <Button type="submit" className="w-full">
        Schedule Post
      </Button>
    </form>
  );
};

export default SchedulerForm;