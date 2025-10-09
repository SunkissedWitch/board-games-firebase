export const Divider = ({ className }: { className?: string }) => (
  <div className={["w-full h-px bg-current/10 my-4 flex-none", className].filter(Boolean).join(" ")} />
)
