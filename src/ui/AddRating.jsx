import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";

const ReactSpeedometerWrapper = styled.div`
  .segment-value,
  .current-value {
    user-select: none;
  }
  svg {
    height: 200px !important;
  }
`;

function AddRating({ setRating, initialValue }) {
  const [value, setValue] = useState(0);
  function handleSelection(e) {
    setValue(e.value);
    setRating(e.value);
  }
  useEffect(() => {
    if (initialValue) setValue(initialValue);
    else setValue(0);
  }, [initialValue]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ReactSpeedometerWrapper>
        <ReactSpeedometer minValue={0} maxValue={5} value={value} />
      </ReactSpeedometerWrapper>
      <div>
        <InputNumber
          inputId="integeronly"
          inputClassName="bg-transparent border-primary border p-2 font-poppins w-[150px] mx-auto text-center"
          value={value}
          min={0}
          max={5}
          onValueChange={handleSelection}
        />
      </div>
    </div>
  );
}

export default AddRating;
