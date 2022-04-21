import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

export default class Router extends Component {
  render() {
    return (
      <Routes>

        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
  
      </Routes>
    );
  }
}
