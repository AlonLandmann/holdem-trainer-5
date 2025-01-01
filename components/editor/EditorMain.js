import Brush from "@/components/editor/Brush";
import Categories from "@/components/editor/Categories";
import History from "@/components/editor/History";
import Legend from "@/components/editor/Legend";
import Matrix from "@/components/editor/Matrix";
import Predecessor from "@/components/editor/Predecessor";
import Stacks from "@/components/editor/Stacks";
import Toolbar from "@/components/editor/Toolbar";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditorMain({ user, setViewHotkeyInfo }) {
  const router = useRouter();
  const allRanges = Object.keys(user.ranges).map(id => user.ranges[id]);
  const selectedRange = allRanges.find(r => r.id === Number(router.query["range-id"]));
  const [range, setRange] = useState(selectedRange || allRanges[0]);
  const [selected, setSelected] = useState([]);
  const [hovered, setHovered] = useState([]);
  const [optionHover, setOptionHover] = useState(null);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [error, setError] = useState(false);
  const [windowWidth, windowHeight] = useWindowDimensions();
  const [layoutColumns, setLayoutColumns] = useState(1);
  const [cellWidth, setCellWidth] = useState(8);

  useEffect(() => {
    if (windowWidth) {
      if (windowWidth < 595) {
        setLayoutColumns(1);
        setCellWidth(8);
      } else if (windowWidth < 647) {
        setLayoutColumns(1);
        setCellWidth(9);
      } else if (windowWidth < 699) {
        setLayoutColumns(1);
        setCellWidth(10);
      } else if (windowWidth < 757) {
        setLayoutColumns(1);
        setCellWidth(11);
      } else if (windowWidth < 809) {
        setLayoutColumns(1);
        setCellWidth(12);
      } else if (windowWidth < 861) {
        setLayoutColumns(1);
        setCellWidth(13);
      } else if (windowWidth < 915) {
        setLayoutColumns(1);
        setCellWidth(14);
      } else if (windowWidth < 967) {
        setLayoutColumns(2);
        setCellWidth(8);
      } else if (windowWidth < 1019) {
        setLayoutColumns(2);
        setCellWidth(9);
      } else if (windowWidth < 1071) {
        setLayoutColumns(2);
        setCellWidth(10);
      } else if (windowWidth < 1129) {
        setLayoutColumns(2);
        setCellWidth(11);
      } else if (windowWidth < 1181) {
        setLayoutColumns(2);
        setCellWidth(12);
      } else if (windowWidth < 1233) {
        setLayoutColumns(2);
        setCellWidth(13);
      } else if (windowWidth < 1391) {
        setLayoutColumns(2);
        setCellWidth(14);
      } else if (windowWidth < 1443) {
        setLayoutColumns(3);
        setCellWidth(10);
      } else if (windowWidth < 1501) {
        setLayoutColumns(3);
        setCellWidth(11);
      } else if (windowWidth < 1553) {
        setLayoutColumns(3);
        setCellWidth(12);
      } else if (windowWidth < 1605) {
        setLayoutColumns(3);
        setCellWidth(13);
      } else {
        setLayoutColumns(3);
        setCellWidth(14);
      }
    }
  }, [windowWidth]);

  function setRangeWithUndo(newRange) {
    setPast((prev) => [...prev, range].slice(-50));
    setRange(newRange);
    setFuture([]);
  }

  return !range ? null : (
    <div className="grow overflow-x-auto">
      <Toolbar
        allRanges={allRanges}
        range={range}
        setRange={setRange}
        past={past}
        setPast={setPast}
        future={future}
        setFuture={setFuture}
        error={error}
        setViewHotkeyInfo={setViewHotkeyInfo}
        settings={user.settings}
      />
      <div className={`flex p-3 gap-3 ${layoutColumns === 1 ? "flex-col-reverse" : ""}`}>
        <div
          className={`flex flex-col ${layoutColumns === 1 ? "items-stretch w-[360px]" : "overflow-y-auto no-scrollbar"} gap-3`}
          style={{ maxHeight: layoutColumns >= 2 ? "calc(100vh - 49px - 24px)" : "none" }}
        >
          <Stacks
            range={range}
            setRange={setRangeWithUndo}
            setError={setError}
          />
          <History
            range={range}
            setRange={setRangeWithUndo}
            error={error}
          />
          <Predecessor
            user={user}
            range={range}
            setRange={setRangeWithUndo}
          />
          <Brush
            range={range}
            setRange={setRangeWithUndo}
            selected={selected}
            setSelected={setSelected}
            setOptionHover={setOptionHover}
            settings={user.settings}
          />
          {layoutColumns <= 2 &&
            <>
              <Categories
                range={range}
                setSelected={setSelected}
                setHovered={setHovered}
              />
              <Legend
                range={range}
                setSelected={setSelected}
                setHovered={setHovered}
              />
            </>
          }
        </div>
        <Matrix
          range={range}
          selected={selected}
          setSelected={setSelected}
          hovered={hovered}
          setHovered={setHovered}
          optionHover={optionHover}
          cellWidth={cellWidth}
        />
        {layoutColumns === 3 &&
          <div
            className="flex flex-col gap-3 overflow-y-auto no-scrollbar"
            style={{ maxHeight: "calc(100vh - 49px - 24px)" }}
          >
            <Categories
              range={range}
              setSelected={setSelected}
              setHovered={setHovered}
            />
            <Legend
              range={range}
              setSelected={setSelected}
              setHovered={setHovered}
            />
          </div>
        }
      </div>
    </div>
  );
};