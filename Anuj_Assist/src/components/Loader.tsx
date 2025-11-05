// Loader: typing indicator

const Loader = () => (
  <div className="flex items-center gap-2 my-2" aria-label="Bot is typing">
    <span className="animate-bounce">🤖</span>
    <span className="text-gray-500">Bot is typing...</span>
  </div>
);

export default Loader;
