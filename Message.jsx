function Message({ msg }) {
  return (
    <div
      className={`flex ${
        msg.role === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl text-sm text-white md:text-base leading-7 ${
          msg.role === "user"
            ? "bg-slate-800"
            : "bg-slate-600"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export default Message;