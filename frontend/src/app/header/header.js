import React from "react";
import Link from "next/link";
import "../components/styles/header.css";

export default function Header() {
  return React.createElement(
    "header",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "transparent",
        padding: "1rem 2rem",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      },
    },
    React.createElement(
      "div",
      { style: { fontWeight: "bold", fontSize: "1.5rem" } },
      React.createElement(
        Link,
        {
          href: "/",
          style: { color: "white", textDecoration: "none" },
        },
        "Logo"
      )
    ),
    React.createElement(
      "nav",
      {
        style: {
          display: "flex",
          gap: "1rem",
          fontWeight: "bold",
          fontSize: "1.5rem",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            border: "2px solid white",
            borderRadius: "4px",
            display: "inline-block",
          },
        },
        React.createElement(
          Link,
          {
            href: "/my-account",
            className: "header-box",
            style: { color: "white", textDecoration: "none" },
          },
          "Account"
        )
      ),
      React.createElement(
        "div",
        {
          style: {
            border: "2px solid white",
            borderRadius: "4px",
            display: "inline-block",
          },
        },
        React.createElement(
          Link,
          {
            href: "/cart",
            className: "header-box",
            style: { color: "white", textDecoration: "none" },
          },
          "Cart"
        )
      )
    )
  );
}
