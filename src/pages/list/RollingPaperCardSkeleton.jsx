import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  StyledCardWrapper,
  StyledCardContent,
  StyledCardText,
  StyledNameTitle,
  StyledEmojiContent,
} from "./RollingPaperCard";

function RollingPaperCardSkeleton({ $variant }) {
  return (
    // 실제 카드와 동일한 스타일 컴포넌트(Wrapper)를 사용하여 크기를 맞춤
    <StyledCardWrapper
      $background={{ type: "color", value: "#f9f9f9" }}
      $variant={$variant}
    >
      <StyledCardContent $variant={$variant}>
        <StyledCardText>
          <StyledNameTitle>
            <Skeleton width="60%" height={24} />
          </StyledNameTitle>
          <Skeleton width="40%" height={16} />
        </StyledCardText>
        <StyledEmojiContent $isImage={false}>
          <Skeleton
            circle
            width={32}
            height={32}
            count={3}
            inline
            style={{ marginRight: "8px" }}
          />
        </StyledEmojiContent>
      </StyledCardContent>
    </StyledCardWrapper>
  );
}
export default RollingPaperCardSkeleton;
