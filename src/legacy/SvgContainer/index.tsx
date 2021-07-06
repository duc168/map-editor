import React, { useEffect, useState } from 'react';
type ModeType = "drag" | "normal";
const defaultRectInfo = {
    x: 50,
    y: 100,
    width: 200,
    height: 100,
    color: "red",
    border: {
      selected: {
        color: "rgb(0, 150, 200)",
      },
      normal: {
        color: "gray",
      },
    },
  };
  const defaultCircleInfo = {
    x: 150,
    y: 150,
    radius: 45,
    color: "green",
  };
  const defaultTextInfo = {
    x: 150,
    y: 160,
    size: 40,
    color: "white",
  };
function CanvasAndSvg() {
    document.title = "Autonomous Canvas";
    const [rectInfo, updateRectInfo] = useState(defaultRectInfo);
    const [circleInfo, updateCircleInfo] = useState(defaultCircleInfo);
    const [textInfo, updateTextInfo] = useState(defaultTextInfo);
    const [mode, updateMode] = useState<ModeType>("normal");
    const [resizable, updateResizableStatus] = useState(false);
    const onClickSvg = () => {
      if (mode === "normal") {
        updateMode("drag");
        return;
      }
      if (mode === "drag") {
        updateMode("normal");
        return;
      }
    };
    const resetAll = () => {
      updateMode("normal");
      updateResizableStatus(false);
    };
    const onBorderDrap = (e: React.MouseEvent) => {
      console.log("on drag border ", e.clientX, e.clientY);
      updateResizableStatus(true);
    };
    const onBorderDrop = (e: React.MouseEvent) => {
      console.log("on drop border ", e.clientX, e.clientY);
      updateResizableStatus(false);
    };
    const onMouseUpOnSvg = (e: React.MouseEvent) => {
      if (resizable) {
        onBorderDrop(e);
      }
    };
    const onMouseMoveOnSvg = (e: React.MouseEvent) => {
      if (mode === "drag") {
        // console.log(e.clientX, e.clientY)
        const x = e.clientX;
        const y = e.clientY;
        updateRectInfo({
          ...rectInfo,
          x: x - rectInfo.width / 2,
          y: y - rectInfo.height / 2,
        });
        updateCircleInfo({
          ...circleInfo,
          x,
          y,
        });
        updateTextInfo({
          ...textInfo,
          x,
          y,
        });
      }
      if (resizable) {
        const x = e.clientX;
        const y = e.clientY;
        console.log(x, y);
        const rectWidth = x - rectInfo.x + 12.5 - 5;
        const rectHeight = y - rectInfo.y + 6.25 - 5;
        if (rectWidth > 0 && rectHeight > 0) {
          updateRectInfo({
            ...rectInfo,
            width: rectWidth,
            height: rectHeight,
          });
        }
  
        // updateCircleInfo({
        //   ...circleInfo,
        //   radius: (x - circleInfo.x) / 2
        // })
        // updateTextInfo({
        //   ...textInfo,
        //   x: x - (x - textInfo.x),
        //   y: y - (y - textInfo.y),
        // })
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const escapeKey = 27;
      if (e.keyCode === escapeKey) {
        resetAll();
      }
    };
    useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
    }, []);
    useEffect(() => {
      const canvas = document.getElementById(
        "canvas"
      ) as HTMLCanvasElement | null;
      if (canvas === null) {
        return;
      }
      const ctx = canvas.getContext("2d");
      if (ctx === null) return;
      // ctx.fillStyle = '#010101';
      // ctx.fillRect(10, 10, 200, 100);
      ctx.strokeRect(10, 10, 200, 100);
    });
    return (
      <div className="app">
        {/* <canvas id="canvas"></canvas> */}
        <svg
          width="100vw"
          height="100vh"
          onMouseMove={onMouseMoveOnSvg}
          onMouseUp={onMouseUpOnSvg}
        >
          <g className="svg-object">
            {mode === "normal" && (
              <rect
                onMouseDown={onBorderDrap}
                onMouseUp={onBorderDrop}
                className="svg-object__border"
                x={rectInfo.x}
                y={rectInfo.y}
                width={rectInfo.width}
                height={rectInfo.height}
                stroke={rectInfo.border.normal.color}
                strokeWidth="10"
              />
            )}
            {mode === "drag" && (
              <rect
                className="svg-object__border"
                x={rectInfo.x}
                y={rectInfo.y}
                width={rectInfo.width}
                height={rectInfo.height}
                stroke={rectInfo.border.selected.color}
                strokeWidth="10"
              />
            )}
            <rect
              x={rectInfo.x}
              y={rectInfo.y}
              width={rectInfo.width}
              height={rectInfo.height}
              fill={rectInfo.color}
              onClick={onClickSvg}
            />
            <circle
              cx={circleInfo.x}
              cy={circleInfo.y}
              r={circleInfo.radius}
              fill={circleInfo.color}
              onClick={onClickSvg}
            />
            <text
              x={textInfo.x}
              y={textInfo.y}
              fontSize={textInfo.size}
              textAnchor="middle"
              fill={textInfo.color}
              onClick={onClickSvg}
            >
              Auto
            </text>
          </g>
        </svg>
      </div>
    );
  }

  export default CanvasAndSvg;