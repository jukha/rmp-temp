import { useState } from "react";
import { getBgColor } from "../utils/calcBgColor";
import styled from "styled-components";

function AddRating({
  tileWidth = "60px",
  tileHeight = "40px",
  maxRating = 5,
  gap = "2px",
  ratingData = [],
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    setClicked(true);
    setIsHovered(true); // Set isHovered to true when a rating is clicked
  };

  const handleHover = (hoveredRating) => {
    setTempRating(hoveredRating);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!clicked) {
      setTempRating(0);
      setIsHovered(false);
    }
  };

  const wrapperStylings = {
    display: "grid",
    gap,
    gridTemplateRows: tileHeight,
    gridTemplateColumns: `repeat(${maxRating}, ${tileWidth})`,
  };

  const Wrapper = styled.div`
    display: grid;
    gap: ${(props) => props.gap};
    grid-template-rows: ${(props) => props.tileHeight};
    grid-template-columns: ${(props) =>
      `repeat(${props.maxRating}, ${props.tileWidth})`};
    @media (max-width: 576px) {
      grid-template-columns: ${(props) => `repeat(${props.maxRating}, 40px)`};
      grid-template-rows: 30px;
    }
  `;

  const firstTileStylings = {
    borderRadius: "20px 0px 0px 20px",
  };

  const lastTileStylings = {
    borderRadius: "0px 20px 20px 0px",
  };

  return (
    <div className="mx-auto max-w-max">
      <Wrapper
        gap={gap}
        tileHeight={tileHeight}
        tileWidth={tileWidth}
        maxRating={maxRating}
      >
        {Array.from({ length: maxRating }, (_, i) => (
          <div
            key={i}
            className="bg-background"
            style={{
              ...((clicked && rating >= i + 1) ||
              (isHovered && (tempRating >= i + 1 || rating >= i + 1))
                ? { backgroundColor: getBgColor(i + 1) }
                : { backgroundColor: "#ccc" }), // default gray background
              ...(i === 0
                ? firstTileStylings
                : i === maxRating - 1
                  ? lastTileStylings
                  : {}),
            }}
            onClick={() => handleRating(i + 1)}
            onMouseEnter={() => handleHover(i + 1)}
            onMouseLeave={handleMouseLeave}
          ></div>
        ))}
      </Wrapper>

      <div className="mt-4">
        <p className="text-center">
          {isHovered ? `${ratingData[tempRating - 1]?.name}-${tempRating}` : ""}
        </p>
        {rating === 0 && !isHovered && (
          <div className="flex justify-between" id="two">
            <span>1-{ratingData[1].name}</span>
            <span>
              {maxRating} -{ratingData[maxRating - 1].name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddRating;
