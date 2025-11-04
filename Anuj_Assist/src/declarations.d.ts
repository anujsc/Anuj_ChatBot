// TypeScript module declarations for JSX components
// Allows importing .jsx files in a TS project without type errors

declare module "./components/Header" {
  const Header: React.FC;
  export default Header;
}

declare module "./components/ChatContainer" {
  const ChatContainer: React.FC;
  export default ChatContainer;
}
