import React from "react";

export default function NameForm({
  formSubmitHandler,
}: {
  formSubmitHandler: (e: React.FormEvent) => void;
}) {
  return (
    <div>
      <h1>Enter your name</h1>
      <form onSubmit={formSubmitHandler}>
        <input name="name" type="text" />
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
