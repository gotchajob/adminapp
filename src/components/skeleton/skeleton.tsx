import Skeleton, { SkeletonProps } from "@mui/material/Skeleton";

export const StyledSkeleton = ({ ...props }: SkeletonProps) => {
  return <Skeleton variant="rounded" {...props} />;
};
