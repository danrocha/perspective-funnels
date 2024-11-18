import "@/app/iphone.css";
import React from "react";

export default function PhoneFrame({
  children,
  bgColor,
}: {
  children: React.ReactNode;
  bgColor?: string;
}) {
  return (
    <div className="device device-iphone-14-pro">
      <div className="device-frame">
        <div
          className="device-screen overflow-hidden"
          style={{ backgroundColor: bgColor || "white" }}
        >
          {children}
        </div>
      </div>
      <div className="device-stripe"></div>
      <div className="device-header"></div>
      <div className="device-sensors"></div>
      <div className="device-btns"></div>
      <div className="device-power"></div>
      <div className="device-home"></div>
    </div>
  );
}
