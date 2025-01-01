import { values } from "@/lib/cards";
import { optionColor } from "@/lib/colors";
import { useState } from "react";

export default function CardDistributions({ range, cellWidth = 15 }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const blockWidth = 4 * cellWidth;
  const matrixWidth = 13 * blockWidth + 12 + 1;
  const headlineWidth = cellWidth >= 12 ? 40 : cellWidth >= 8 ? 34 : 22;
  const suitArrayWidth = 14;


  const distributions = [];

  for (let i = 0; i < range.options.length; i++) {
    distributions.push(Array(13).fill(0));
  }

  range.matrix.forEach(({ combo, frequency, strategy }) => {
    const valueIndex1 = values.indexOf(combo.charAt(0));
    const valueIndex2 = values.indexOf(combo.charAt(2));

    for (let j = 0; j < strategy.length; j++) {
      distributions[j][valueIndex1] += frequency * strategy[j];

      if (valueIndex2 !== valueIndex1) {
        distributions[j][valueIndex2] += frequency * strategy[j];
      }
    }
  });

  return (
    <div>
      <div className="flex gap-2">
        {values.map((value, j) => (
          <div key={"value" + j} className="w-8 text-center">
            {value}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {distributions.slice(1).map((distribution, i) => (
          <div key={"distribution" + i + 1} className="flex gap-2 items-end border">
            {values.map((value, j) => (
              <div key={"distribution" + i + 1 + "value" + j}>
                <div className="w-8" style={{
                  backgroundColor: optionColor(range.options[i + 1], range.spot),
                  height: 32 * distribution[j] / Math.max(...distribution),
                }}>

                </div>
                <div className="w-8 text-center">
                  {(distribution[j]).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};