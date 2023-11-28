import avatarPlaceholder from "@/assets/avatar-placeholder.png";

interface AvatarProps {
  src: string;
}

export const Avatar = ({ src }: AvatarProps) => {
  if (!src) {
    console.log("src is null");
  }
  return (
    <img
      src={src || avatarPlaceholder}
      alt="avatar"
      className="w-10 h-10 rounded-full"
    />
  );
};
