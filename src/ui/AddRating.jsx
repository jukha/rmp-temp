import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { useEffect, useState, useRef } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";

const ReactSpeedometerWrapper = styled.div`
  width: 300px;
  height: 200px;
  @media (max-width: 576px) {
    width: 250px;
    height: 200px;
  }
  .segment-value,
  .current-value {
    user-select: none;
  }
`;

function AddRating({ setRating, initialValue }) {
  const [value, setValue] = useState(0);
  const wrapperRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleSelection(e) {
    setValue(e.value);
    setRating(e.value);
    if (windowWidth < 768) {
      setTimeout(() => handleBlur(), 1000);
    }
  }

  function handleBlur() {
    const parent = wrapperRef.current.parentNode;
    const stickyHeaderHeight = "100";

    if (parent && parent.nextElementSibling) {
      const offset = parent.nextElementSibling.offsetTop - stickyHeaderHeight;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    if (initialValue) setValue(initialValue);
    else setValue(0);
  }, [initialValue]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col items-center justify-center">
      <ReactSpeedometerWrapper>
        <ReactSpeedometer
          segmentColors={[
            "#FFB6C1",
            "#FFD700",
            "#BFBFA2",
            "#90EE90",
            "#ADD8E6",
          ]}
          fluidWidth={true}
          minValue={0}
          maxValue={5}
          value={value}
        />
      </ReactSpeedometerWrapper>
      <div>
        <InputNumber
          inputId="integeronly"
          inputClassName="bg-transparent border-primary border p-2 font-poppins w-[150px] mx-auto text-center text-black dark:text-white"
          value={value}
          min={0}
          max={5}
          onValueChange={handleSelection}
          readOnly={windowWidth < 768}
          onBlur={handleBlur}
        />
        {windowWidth < 768 && (
          <Slider
            value={value}
            min={0}
            max={5}
            // onChange={(e) => setValue(e.value)}
            onChange={handleSelection}
            className="bg-primary"
            pt={{
              range: "bg-accent",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AddRating;
