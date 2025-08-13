import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { useState } from "react";

export default function Popup() {
  const [server, setServer] = useState("");

  function handleSetServer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    setServer(form["server_input"].value);
  }

  return (
    <>
      <Label>Server:</Label>
      <form
        className="flex flex-row"
        onSubmit={(e) => {
          handleSetServer(e);
        }}>
        <Input className="flex-1" name="server_input" />
        <Button>Submit</Button>
      </form>
      <Label>
        Server set as:<span>{server}</span>
      </Label>
    </>
  );
}
