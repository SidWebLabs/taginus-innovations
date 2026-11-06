export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`${className} transition-transform duration-700 ease-out group-hover:rotate-[60deg]`}>
      <rect width="32" height="32" rx="8" fill="#12372a" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <ellipse key={a} cx="16" cy="9" rx="3" ry="5" fill="#f2a900" transform={`rotate(${a} 16 16)`} />
      ))}
      <circle cx="16" cy="16" r="3.2" fill="#12372a" />
    </svg>
  );
}
