"use client";
import ApiViewer from "@/components/ApiViewer";
import Title from "@/components/Title";
import React, { useEffect, useState } from "react";

function Settings() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  return (
    <div>
      <Title>Settings</Title>
      <section>
        {origin ? (
          <ApiViewer
            apiTitle={"NEXT_PUBLIC_API"}
            description={`${origin}/api`}
          />
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
}

export default Settings;
