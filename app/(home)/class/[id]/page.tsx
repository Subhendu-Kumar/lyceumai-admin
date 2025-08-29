"use client";
import React from "react";

const ClassHome = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  return <div>ClassHome {id}</div>;
};

export default ClassHome;
