import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { readStorage, useStorage } from "@src/hooks/useStorage";
import { useEffect, useState } from "react";

export default function Popup() {
  // Local UI state
  const [uiServer, setUiServer] = useState("");

  // Storage state (persists in local/sync storage)
  const [localServer, setlocalServer] = useStorage<string>("server", "");

  // Hydrate server from local storage
  useEffect(() => {
    async function loadServer() {
      const value = await readStorage<string>("server", "local");
      if (value !== undefined) {
        setUiServer(value);
      }
    }
    loadServer();
  }, []);

  function handleSetServer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const newValue = form["server_input"].value;

    // Sets on the client
    setUiServer(newValue); // UI State
    setlocalServer(newValue); // Local state

    // Sets on the server

    // DEBUG
    console.log("[DEBUG] Server set to:", newValue);
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
        Server set as:<span>{uiServer}</span>
      </Label>
    </>
  );
}
